#!/usr/bin/env python3
"""Fase 4 hardening — production after home trackConversion + GTM v26 Ads Lead.

Gate 4: home/contact/LP/WA → 1 Meta Lead + 1 Ads Lead;
clicks and gtm.formSubmission → 0 Meta Lead and 0 Ads Lead.
"""

from __future__ import annotations

import json
import time
from datetime import datetime, timezone
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "https://www.auditik.com.br"
PIXEL = "856128025882243"
ADS_SEND_TO = "AW-10939469130/sLpxCK7558ccEMqarOAo"
OUT = (
    Path(__file__).resolve().parent.parent
    / ".cursor"
    / "plans"
    / "fase-4-hardening-results.json"
)

INSTALL_FBQ_SPY = """
() => {
  window.__fbqLog = window.__fbqLog || [];
  if (window.__fbqSpyInstalled) return !!window.fbq;
  const wrap = () => {
    if (typeof window.fbq !== 'function' || window.__fbqSpyInstalled) return false;
    const orig = window.fbq;
    window.fbq = function() {
      try { window.__fbqLog.push({ t: Date.now(), args: Array.from(arguments) }); } catch (e) {}
      return orig.apply(this, arguments);
    };
    try {
      Object.keys(orig).forEach(k => { window.fbq[k] = orig[k]; });
    } catch (e) {}
    window.__fbqSpyInstalled = true;
    return true;
  };
  if (!wrap()) {
    let n = 0;
    const id = setInterval(() => {
      if (wrap() || ++n > 40) clearInterval(id);
    }, 250);
  }
  return true;
}
"""

INSTALL_GTAG_SPY = """
() => {
  window.__gtagLog = window.__gtagLog || [];
  if (window.__gtagSpyInstalled) return typeof window.gtag === 'function';
  const wrap = () => {
    if (typeof window.gtag !== 'function' || window.__gtagSpyInstalled) return false;
    const orig = window.gtag;
    window.gtag = function() {
      try { window.__gtagLog.push({ t: Date.now(), args: Array.from(arguments) }); } catch (e) {}
      return orig.apply(this, arguments);
    };
    window.__gtagSpyInstalled = true;
    return true;
  };
  if (!wrap()) {
    let n = 0;
    const id = setInterval(() => {
      if (wrap() || ++n > 40) clearInterval(id);
    }, 250);
  }
  // Also hook dataLayer.push for gtag.js queue style
  window.dataLayer = window.dataLayer || [];
  if (!window.__gtagDlSpy) {
    const origPush = window.dataLayer.push.bind(window.dataLayer);
    window.dataLayer.push = function() {
      try {
        const a = Array.from(arguments);
        if (a.length && (a[0] === 'event' || (a[0] && a[0].event === 'conversion'))) {
          window.__gtagLog.push({ t: Date.now(), args: a, via: 'dataLayer' });
        }
      } catch (e) {}
      return origPush.apply(null, arguments);
    };
    window.__gtagDlSpy = true;
  }
  return true;
}
"""


def wait(ms: int) -> None:
    time.sleep(ms / 1000)


def setup_page(context):
    page = context.new_page()
    ads_hits: list[dict] = []

    def on_route(route):
        req = route.request
        url = req.url
        lower = url.lower()
        if req.method == "POST" and any(
            k in lower for k in ("integrations/leads", "ingest", "lead", "proxy")
        ):
            if "facebook" not in lower and "google" not in lower:
                route.fulfill(
                    status=200,
                    content_type="application/json",
                    body='{"ok":true,"fase4":"mocked"}',
                )
                return
        route.continue_()

    page.route("**/*", on_route)

    def on_request(req):
        url = req.url
        if "googleadservices.com/pagead/conversion" in url or (
            "google.com/pagead/1p-conversion" in url
        ):
            ads_hits.append({"t": time.time(), "url": url[:220]})
        if ADS_SEND_TO.replace("/", "%2F") in url or (
            "10939469130" in url and "sLpxCK7558ccEMqarOAo" in url
        ):
            ads_hits.append({"t": time.time(), "url": url[:220], "label": True})

    page.on("request", on_request)

    page.add_init_script(
        """
        window.__fase4Dl = [];
        window.__fbqLog = [];
        window.__gtagLog = [];
        window.__fbqSpyInstalled = false;
        window.__gtagSpyInstalled = false;
        (function installDl() {
          window.dataLayer = window.dataLayer || [];
          var orig = window.dataLayer.push.bind(window.dataLayer);
          window.dataLayer.push = function() {
            try {
              var item = arguments[0];
              if (item && typeof item === 'object' && item.event) {
                window.__fase4Dl.push({
                  event: item.event,
                  conversion_type: item.conversion_type || null,
                  at: Date.now()
                });
              }
            } catch (e) {}
            return orig.apply(null, arguments);
          };
        })();
        """
    )
    return page, ads_hits


def ensure_spies(page) -> None:
    for _ in range(24):
        page.evaluate(INSTALL_FBQ_SPY)
        page.evaluate(INSTALL_GTAG_SPY)
        ready = page.evaluate(
            """() => typeof window.fbq === 'function' && !!window.__fbqSpyInstalled
              && typeof window.gtag === 'function'"""
        )
        if ready:
            return
        wait(500)


def dl_events(page):
    return page.evaluate("() => (window.__fase4Dl || []).map(e => e.event)")


def now_ms(page) -> int:
    return page.evaluate("() => Date.now()")


def count_track_single(page, since_ms: int, event_name: str) -> int:
    return page.evaluate(
        """({ sinceMs, eventName, pixel }) => {
          const log = window.__fbqLog || [];
          let n = 0;
          for (const entry of log) {
            if (!entry || entry.t < sinceMs) continue;
            const a = entry.args || [];
            if (a[0] === 'trackSingle' && String(a[1]) === pixel && a[2] === eventName) n++;
          }
          return n;
        }""",
        {"sinceMs": since_ms, "eventName": event_name, "pixel": PIXEL},
    )


def count_ads_lead(page, since_ms: int, ads_hits: list, since_t: float) -> dict:
    gtag_n = page.evaluate(
        """({ sinceMs, sendTo }) => {
          const log = window.__gtagLog || [];
          let n = 0;
          for (const entry of log) {
            if (!entry || entry.t < sinceMs) continue;
            const a = entry.args || [];
            // gtag('event', 'conversion', { send_to: 'AW-.../label' })
            if (a[0] === 'event' && a[1] === 'conversion') {
              const p = a[2] || {};
              if (p.send_to === sendTo || String(p.send_to || '').includes('sLpxCK7558ccEMqarOAo')) n++;
            }
            // dataLayer queue: ['event', 'conversion', {...}]
            if (Array.isArray(a[0])) continue;
          }
          // Also scan dataLayer for conversion events with send_to
          for (const item of (window.dataLayer || [])) {
            if (!item) continue;
            if (item[0] === 'event' && item[1] === 'conversion') {
              const p = item[2] || {};
              if (p.send_to === sendTo || String(p.send_to || '').includes('sLpxCK7558ccEMqarOAo')) n++;
            }
            if (item.event === 'conversion' && (
              item.send_to === sendTo || String(item.send_to || '').includes('sLpxCK7558ccEMqarOAo')
            )) n++;
          }
          return n;
        }""",
        {"sinceMs": since_ms, "sendTo": ADS_SEND_TO},
    )
    net_n = sum(1 for h in ads_hits if h["t"] >= since_t)
    return {"gtagConversion": gtag_n, "adsNetworkHits": net_n, "adsLeadOk": gtag_n >= 1 or net_n >= 1}


def push_event(page, event, extra=None):
    extra = extra or {}
    page.evaluate(
        """({ event, extra }) => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(Object.assign({ event, fase4_origin: 'console_push' }, extra));
        }""",
        {"event": event, "extra": extra},
    )


def push_contact_pair(page, conversion_event: str, goal: str, page_label: str):
    """Simulate trackConversion fan-out: conversion_* then google_ads_conversion contact."""
    push_event(page, conversion_event, {"goal_name": goal, "page": page_label})
    push_event(
        page,
        "google_ads_conversion",
        {"conversion_type": "contact", "goal_name": goal, "page": page_label},
    )


def fill_home_form(page) -> bool:
    try:
        page.locator('input[name="nome"]').first.fill("Fase4 Teste Gate")
        page.locator('input[name="whatsapp"]').first.fill("(19) 99999-0004")
        # cidade select
        cidade = page.locator('select[name="cidade"]').first
        options = cidade.locator("option").all_text_contents()
        pick = next((o for o in options if o and "selecione" not in o.lower()), None)
        if pick:
            cidade.select_option(label=pick)
        para = page.locator('select[name="paraQuem"]').first
        popts = para.locator("option").all_text_contents()
        ppick = next((o for o in popts if o and "selecione" not in o.lower()), None)
        if ppick:
            para.select_option(label=ppick)
        return True
    except Exception:
        return False


def main():
    results = []
    notes = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="chrome")
        context = browser.new_context(
            viewport={"width": 1280, "height": 900},
            user_agent=(
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            ),
        )

        # Case A: home UI submit (needs deployed trackConversion)
        page, ads = setup_page(context)
        page.goto(f"{BASE}/", wait_until="networkidle", timeout=60000)
        wait(3500)
        ensure_spies(page)
        filled = fill_home_form(page)
        t_ms = now_ms(page)
        t0 = time.time()
        submitted = False
        if filled:
            try:
                page.locator('form button[type="submit"]').first.click(timeout=10000)
                submitted = True
            except Exception:
                try:
                    page.get_by_role("button", name="Quero minha avaliação").click(
                        timeout=8000
                    )
                    submitted = True
                except Exception:
                    submitted = False
        wait(4000)
        dl = dl_events(page)
        has_conv = "conversion_contact_form_submit" in dl
        has_ads_ev = page.evaluate(
            """() => (window.__fase4Dl || []).some(e =>
              e.event === 'google_ads_conversion' && e.conversion_type === 'contact')"""
        )
        meta_lead = count_track_single(page, t_ms, "Lead")
        ads_info = count_ads_lead(page, t_ms, ads, t0)
        ok = (
            submitted
            and has_conv
            and has_ads_ev
            and meta_lead == 1
            and ads_info["adsLeadOk"]
        )
        results.append(
            {
                "case": "home-ui",
                "name": "Home submit UI → Meta Lead + Ads Lead",
                "ok": ok,
                "detail": {
                    "filled": filled,
                    "submitted": submitted,
                    "hasConversion": has_conv,
                    "hasAdsContact": has_ads_ev,
                    "metaLead": meta_lead,
                    **ads_info,
                },
            }
        )
        notes.append(
            f"home-ui submitted={submitted} conv={has_conv} adsEv={has_ads_ev} "
            f"meta={meta_lead} ads={ads_info}"
        )
        page.close()

        # Cases B–D: regression via dataLayer pair (isola GTM v26)
        for case, path, conv_event, goal, label in [
            (
                "contato",
                "/contato/",
                "conversion_contact_form_submit",
                "contact_form_submit",
                "contato",
            ),
            (
                "lp",
                "/lp/americana-philips/",
                "conversion_contact_form_submit",
                "contact_form_submit",
                "lp",
            ),
            (
                "whatsapp",
                "/contato/",
                "conversion_whatsapp_lead_submitted",
                "whatsapp_lead_submitted",
                "whatsapp",
            ),
        ]:
            page, ads = setup_page(context)
            page.goto(f"{BASE}{path}", wait_until="domcontentloaded", timeout=60000)
            if "lp/" in path:
                page.mouse.move(100, 100)
                page.evaluate("() => window.scrollBy(0, 200)")
                wait(5000)
            else:
                wait(3000)
            ensure_spies(page)
            t_ms = now_ms(page)
            t0 = time.time()
            push_contact_pair(page, conv_event, goal, label)
            wait(3500)
            meta_lead = count_track_single(page, t_ms, "Lead")
            ads_info = count_ads_lead(page, t_ms, ads, t0)
            ok = meta_lead == 1 and ads_info["adsLeadOk"]
            results.append(
                {
                    "case": case,
                    "name": f"{label}: conversion + ads contact → 1 Meta + 1 Ads",
                    "ok": ok,
                    "detail": {
                        "metaLead": meta_lead,
                        "origin": "console_push",
                        **ads_info,
                    },
                }
            )
            notes.append(f"{case}: meta={meta_lead} ads={ads_info}")
            page.close()

        # Case E: WhatsApp gate (no submit) → 0 leads
        page, ads = setup_page(context)
        page.goto(f"{BASE}/contato/", wait_until="networkidle", timeout=60000)
        wait(2500)
        ensure_spies(page)
        t_ms = now_ms(page)
        t0 = time.time()
        opened = False
        try:
            page.get_by_role("button", name="Iniciar Conversa").click(timeout=10000)
            opened = True
        except Exception:
            try:
                page.locator("button").filter(has_text="Iniciar Conversa").first.click(
                    timeout=5000
                )
                opened = True
            except Exception:
                opened = False
        wait(1000)
        try:
            page.get_by_role("button", name="Cancelar").click(timeout=5000)
        except Exception:
            pass
        wait(2000)
        meta_lead = count_track_single(page, t_ms, "Lead")
        ads_info = count_ads_lead(page, t_ms, ads, t0)
        ok = opened and meta_lead == 0 and not ads_info["adsLeadOk"]
        results.append(
            {
                "case": "wa-gate",
                "name": "WhatsApp gate sem submit → 0 Meta / 0 Ads Lead",
                "ok": ok,
                "detail": {"opened": opened, "metaLead": meta_lead, **ads_info},
            }
        )
        notes.append(f"wa-gate opened={opened} meta={meta_lead} ads={ads_info}")
        page.close()

        # Case F: phone click → 0 leads (may emit google_ads_conversion phone)
        page, ads = setup_page(context)
        page.goto(f"{BASE}/", wait_until="networkidle", timeout=60000)
        wait(2500)
        ensure_spies(page)
        t_ms = now_ms(page)
        t0 = time.time()
        page.evaluate(
            """() => {
              document.querySelectorAll('a[href^="tel:"]').forEach(a => {
                a.addEventListener('click', e => e.preventDefault(), { capture: true });
              });
            }"""
        )
        page.locator('a[href="tel:+551933776941"]').first.click(timeout=10000)
        wait(2500)
        meta_lead = count_track_single(page, t_ms, "Lead")
        ads_info = count_ads_lead(page, t_ms, ads, t0)
        has_phone_dl = page.evaluate(
            """() => (window.__fase4Dl || []).some(e =>
              e.event === 'google_ads_conversion' && e.conversion_type === 'phone')
              || (window.__fase4Dl || []).some(e => e.event === 'button_click')"""
        )
        ok = bool(has_phone_dl) and meta_lead == 0 and not ads_info["adsLeadOk"]
        results.append(
            {
                "case": "phone",
                "name": "Telefone → 0 Meta / 0 Ads Lead",
                "ok": ok,
                "detail": {
                    "hasPhoneSignal": has_phone_dl,
                    "metaLead": meta_lead,
                    **ads_info,
                },
            }
        )
        notes.append(f"phone signal={has_phone_dl} meta={meta_lead} ads={ads_info}")
        page.close()

        # Case G: formSubmission → 0
        page, ads = setup_page(context)
        page.goto(f"{BASE}/", wait_until="networkidle", timeout=60000)
        wait(2500)
        ensure_spies(page)
        t_ms = now_ms(page)
        t0 = time.time()
        push_event(page, "gtm.formSubmission", {"gtm.element": "fake"})
        wait(2500)
        meta_lead = count_track_single(page, t_ms, "Lead")
        ads_info = count_ads_lead(page, t_ms, ads, t0)
        ok = meta_lead == 0 and not ads_info["adsLeadOk"]
        results.append(
            {
                "case": "neg-formSubmission",
                "name": "gtm.formSubmission → 0 Meta / 0 Ads Lead",
                "ok": ok,
                "detail": {"metaLead": meta_lead, **ads_info},
            }
        )
        notes.append(f"formSubmission meta={meta_lead} ads={ads_info}")
        page.close()

        # Case H: whatsapp conversion_type alone must not fire Ads Lead
        page, ads = setup_page(context)
        page.goto(f"{BASE}/", wait_until="networkidle", timeout=60000)
        wait(2500)
        ensure_spies(page)
        t_ms = now_ms(page)
        t0 = time.time()
        push_event(
            page,
            "google_ads_conversion",
            {"conversion_type": "whatsapp", "source": "fase4_neg"},
        )
        wait(2500)
        meta_lead = count_track_single(page, t_ms, "Lead")
        ads_info = count_ads_lead(page, t_ms, ads, t0)
        ok = meta_lead == 0 and not ads_info["adsLeadOk"]
        results.append(
            {
                "case": "neg-whatsapp-type",
                "name": "google_ads_conversion whatsapp → 0 Ads Lead",
                "ok": ok,
                "detail": {"metaLead": meta_lead, **ads_info},
            }
        )
        notes.append(f"neg-whatsapp-type meta={meta_lead} ads={ads_info}")
        page.close()
        browser.close()

    gate4 = all(r["ok"] for r in results)
    report = {
        "date": datetime.now(timezone.utc).isoformat(),
        "base": BASE,
        "pixel": PIXEL,
        "adsSendTo": ADS_SEND_TO,
        "gtmLive": 26,
        "method": "Playwright; Meta via fbq trackSingle; Ads via gtag conversion / network",
        "gate4": gate4,
        "results": results,
        "notes": notes,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps({"gate4": gate4, "out": str(OUT), "notes": notes}, indent=2))
    raise SystemExit(0 if gate4 else 1)


if __name__ == "__main__":
    main()
