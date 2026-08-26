#!/usr/bin/env python3
"""Fase 3 cutover — production after site without fbq.

Gate 3: 1 Pixel origin (GTM only), 1 PageView on load, 1 Lead per conversion.
HTML of Next must not embed fbevents / meta-pixel (Network via GTM is OK).
"""

from __future__ import annotations

import json
import time
from datetime import datetime, timezone
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "https://www.auditik.com.br"
PIXEL = "856128025882243"
OUT = Path(__file__).resolve().parent.parent / ".cursor" / "plans" / "fase-3-cutover-results.json"

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


def meta_ev(url: str):
    if "facebook.com" not in url and "facebook.net" not in url:
        return None
    if "/tr" not in url and "fbevents" not in url:
        return None
    ev = None
    pid = None
    for part in url.split("?", 1)[-1].split("&"):
        if part.startswith("ev="):
            ev = part[3:].split("&")[0]
        if part.startswith("id="):
            pid = part[3:].split("&")[0]
    if pid and pid != PIXEL:
        return None
    if "fbevents" in url and not ev:
        ev = "script"
    return {"ev": ev or "?", "url": url[:180]}


def setup_page(context):
    page = context.new_page()
    meta_hits: list[dict] = []

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
                    body='{"ok":true,"fase3":"mocked"}',
                )
                return
        route.continue_()

    page.route("**/*", on_route)

    def on_request(req):
        hit = meta_ev(req.url)
        if hit:
            hit["t"] = time.time()
            meta_hits.append(hit)

    page.on("request", on_request)

    page.add_init_script(
        """
        window.__fase3Dl = [];
        window.__fbqLog = [];
        window.__fbqSpyInstalled = false;
        (function installDl() {
          window.dataLayer = window.dataLayer || [];
          var orig = window.dataLayer.push.bind(window.dataLayer);
          window.dataLayer.push = function() {
            try {
              var item = arguments[0];
              if (item && typeof item === 'object' && item.event) {
                window.__fase3Dl.push({ event: item.event, at: Date.now() });
              }
            } catch (e) {}
            return orig.apply(null, arguments);
          };
        })();
        """
    )
    return page, meta_hits


def ensure_fbq_spy(page):
    for _ in range(24):
        page.evaluate(INSTALL_FBQ_SPY)
        ready = page.evaluate(
            "() => typeof window.fbq === 'function' && !!window.__fbqSpyInstalled"
        )
        if ready:
            return True
        wait(500)
    return bool(page.evaluate("() => typeof window.fbq === 'function'"))


def dl_events(page):
    return page.evaluate("() => (window.__fase3Dl || []).map(e => e.event)")


def count_meta(meta_hits, since, ev_name):
    return sum(1 for h in meta_hits if h["t"] >= since and h["ev"] == ev_name)


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


def count_site_track(page, since_ms: int, event_name: str) -> int:
    """Site-code path: fbq('track', Event) without trackSingle (should be 0 after cutover)."""
    return page.evaluate(
        """({ sinceMs, eventName }) => {
          const log = window.__fbqLog || [];
          let n = 0;
          for (const entry of log) {
            if (!entry || entry.t < sinceMs) continue;
            const a = entry.args || [];
            if (a[0] === 'track' && a[1] === eventName) n++;
          }
          return n;
        }""",
        {"sinceMs": since_ms, "eventName": event_name},
    )


def html_has_site_pixel(page, response_text: str | None) -> dict:
    """Inspect Next HTML (navigation response), not live DOM after GTM injects fbevents."""
    src = response_text or ""
    return {
        "hasMetaPixelScriptId": 'id="meta-pixel"' in src or "id='meta-pixel'" in src,
        "hasFbeventsInNextHtml": "fbevents.js" in src,
        "hasConnectFacebookNetInNextHtml": "connect.facebook.net" in src,
        "hasGtmBootstrap": "GTM-KHQP88V" in src or 'id="gtm-bootstrap"' in src,
        "source": "navigation_response",
    }


def now_ms(page) -> int:
    return page.evaluate("() => Date.now()")


def push_event(page, event, extra=None):
    extra = extra or {}
    page.evaluate(
        """({ event, extra }) => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(Object.assign({ event, fase3_origin: 'console_push' }, extra));
        }""",
        {"event": event, "extra": extra},
    )


def wait(ms):
    time.sleep(ms / 1000)


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

        # HTML + Case 1
        page, meta = setup_page(context)
        t0 = time.time()
        resp = page.goto(f"{BASE}/", wait_until="networkidle", timeout=60000)
        next_html = resp.text() if resp else ""
        wait(4500)
        ensure_fbq_spy(page)
        html = html_has_site_pixel(page, next_html)
        live_meta_id = page.evaluate("() => !!document.getElementById('meta-pixel')")
        dl = dl_events(page)
        has_gtm = "gtm.js" in dl or page.evaluate("() => !!window.google_tag_manager")
        pvs_net = count_meta(meta, t0, "PageView")
        leads_net = count_meta(meta, t0, "Lead")
        # Site-code fbq('track') must be 0; Network PageView from GTM = 1
        site_pv = count_site_track(page, 0, "PageView")
        gtm_pv = count_track_single(page, 0, "PageView")
        html_ok = (
            not html["hasMetaPixelScriptId"]
            and not html["hasFbeventsInNextHtml"]
            and not html["hasConnectFacebookNetInNextHtml"]
            and html["hasGtmBootstrap"]
            and not live_meta_id
        )
        html["liveMetaPixelScriptId"] = live_meta_id
        ok = (
            html_ok
            and bool(has_gtm)
            and site_pv == 0
            and pvs_net == 1
            and leads_net == 0
        )
        results.append(
            {
                "case": "html",
                "name": "HTML sem Pixel do Next (só GTM)",
                "ok": html_ok,
                "detail": html,
            }
        )
        results.append(
            {
                "case": 1,
                "name": "Home load — 1 PageView (GTM only)",
                "ok": ok,
                "detail": {
                    "hasGtmJs": has_gtm,
                    "pageViewsNet": pvs_net,
                    "siteTrackPageView": site_pv,
                    "gtmTrackSinglePageView": gtm_pv,
                    "leads": leads_net,
                    "htmlOk": html_ok,
                },
            }
        )
        notes.append(
            f"HTML ok={html_ok}; Caso1 gtm={has_gtm} netPV={pvs_net} siteTrackPV={site_pv} gtmTS={gtm_pv}"
        )
        page.close()

        # Case 2 SPA
        page, meta = setup_page(context)
        page.goto(f"{BASE}/", wait_until="networkidle", timeout=60000)
        wait(3000)
        ensure_fbq_spy(page)
        t_nav = time.time()
        t_ms = now_ms(page)
        try:
            page.locator('a[href="/contato"], a[href="/contato/"]').first.click(timeout=15000)
        except Exception:
            page.goto(f"{BASE}/contato/", wait_until="domcontentloaded")
        wait(3500)
        dl = dl_events(page)
        has_pv = "page_view" in dl
        spa_net = count_meta(meta, t_nav, "PageView")
        spa_gtm = count_track_single(page, t_ms, "PageView")
        site_pv = count_site_track(page, t_ms, "PageView")
        ok = has_pv and site_pv == 0 and (spa_net >= 1 or spa_gtm >= 1)
        results.append(
            {
                "case": 2,
                "name": "SPA page_view → 1 PageView GTM",
                "ok": ok,
                "detail": {
                    "hasPageView": has_pv,
                    "spaPageViewsNet": spa_net,
                    "spaPageViewsGtmTrackSingle": spa_gtm,
                    "siteTrackPageView": site_pv,
                },
            }
        )
        notes.append(
            f"Caso2 page_view={has_pv} net={spa_net} gtmTS={spa_gtm} siteTrack={site_pv}"
        )
        page.close()

        # Cases 3–5 Leads (exactly 1 trackSingle, 0 site track)
        for case, path, event, goal, label in [
            (
                3,
                "/contato/",
                "conversion_contact_form_submit",
                "contact_form_submit",
                "contato",
            ),
            (
                4,
                "/lp/americana-philips/",
                "conversion_contact_form_submit",
                "contact_form_submit",
                "lp",
            ),
            (
                5,
                "/contato/",
                "conversion_whatsapp_lead_submitted",
                "whatsapp_lead_submitted",
                "whatsapp",
            ),
        ]:
            page, meta = setup_page(context)
            page.goto(f"{BASE}{path}", wait_until="domcontentloaded", timeout=60000)
            if "lp/" in path:
                page.mouse.move(100, 100)
                page.evaluate("() => window.scrollBy(0, 200)")
                wait(5000)
            else:
                wait(3000)
            ensure_fbq_spy(page)
            t_ms = now_ms(page)
            push_event(page, event, {"goal_name": goal, "page": label})
            wait(3500)
            leads_gtm = count_track_single(page, t_ms, "Lead")
            site_lead = count_site_track(page, t_ms, "Lead")
            ok = leads_gtm == 1 and site_lead == 0
            results.append(
                {
                    "case": case,
                    "name": f"{event} → 1 Lead GTM ({label})",
                    "ok": ok,
                    "detail": {
                        "gtmTrackSingleLead": leads_gtm,
                        "siteTrackLead": site_lead,
                        "origin": "console_push",
                    },
                }
            )
            notes.append(f"Caso{case}: trackSingle Lead×{leads_gtm} siteTrack×{site_lead}")
            page.close()

        # Case 6
        page, meta = setup_page(context)
        page.goto(f"{BASE}/contato/", wait_until="networkidle", timeout=60000)
        wait(2500)
        ensure_fbq_spy(page)
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
        dl = dl_events(page)
        has_conv = "conversion_whatsapp_lead_submitted" in dl
        leads_gtm = count_track_single(page, t_ms, "Lead")
        leads_net = count_meta(meta, t0, "Lead")
        ok = opened and (not has_conv) and leads_gtm == 0 and leads_net == 0
        results.append(
            {
                "case": 6,
                "name": "WhatsApp gate sem submit → 0 Lead",
                "ok": ok,
                "detail": {
                    "opened": opened,
                    "hasConversionWa": has_conv,
                    "gtmTrackSingleLead": leads_gtm,
                },
            }
        )
        notes.append(f"Caso6 opened={opened} Lead×{leads_gtm}")
        page.close()

        # Case 7
        page, meta = setup_page(context)
        page.goto(f"{BASE}/", wait_until="networkidle", timeout=60000)
        wait(2500)
        ensure_fbq_spy(page)
        t_ms = now_ms(page)
        page.evaluate(
            """() => {
              document.querySelectorAll('a[href^="tel:"]').forEach(a => {
                a.addEventListener('click', e => e.preventDefault(), { capture: true });
              });
            }"""
        )
        page.locator('a[href="tel:+551933776941"]').first.click(timeout=10000)
        wait(2500)
        has_ads = page.evaluate(
            """() => (window.dataLayer || []).some(e => e && (
              e.event === 'google_ads_conversion' ||
              (e.event === 'button_click' && String(e.button_name || '').includes('phone'))
            ))"""
        )
        leads_gtm = count_track_single(page, t_ms, "Lead")
        ok = bool(has_ads) and leads_gtm == 0
        results.append(
            {
                "case": 7,
                "name": "Telefone footer → 0 Lead",
                "ok": ok,
                "detail": {"hasAds": has_ads, "gtmTrackSingleLead": leads_gtm},
            }
        )
        notes.append(f"Caso7 ads={has_ads} Lead×{leads_gtm}")
        page.close()

        # Neg + Schedule
        page, meta = setup_page(context)
        page.goto(f"{BASE}/", wait_until="networkidle", timeout=60000)
        wait(2500)
        ensure_fbq_spy(page)
        t_ms = now_ms(page)
        push_event(page, "gtm.formSubmission", {"gtm.element": "fake"})
        wait(2000)
        leads_form = count_track_single(page, t_ms, "Lead")
        t_ms2 = now_ms(page)
        push_event(
            page,
            "conversion_appointment_scheduled",
            {"goal_name": "appointment_scheduled"},
        )
        wait(3000)
        schedules = count_track_single(page, t_ms2, "Schedule")
        results.append(
            {
                "case": "neg-formSubmission",
                "name": "gtm.formSubmission → 0 Lead",
                "ok": leads_form == 0,
                "detail": {"gtmTrackSingleLead": leads_form},
            }
        )
        results.append(
            {
                "case": "opt-schedule",
                "name": "conversion_appointment_scheduled → Schedule",
                "ok": schedules == 1,
                "detail": {"gtmTrackSingleSchedule": schedules, "optional": True},
            }
        )
        notes.append(f"formSubmission Lead×{leads_form}; Schedule×{schedules}")
        page.close()
        browser.close()

    core = [r for r in results if isinstance(r["case"], int)]
    html_ok = next(r["ok"] for r in results if r["case"] == "html")
    form_ok = next(r["ok"] for r in results if r["case"] == "neg-formSubmission")
    gate3 = html_ok and all(r["ok"] for r in core) and form_ok

    report = {
        "date": datetime.now(timezone.utc).isoformat(),
        "base": BASE,
        "pixel": PIXEL,
        "gtmLive": 25,
        "method": "post-cutover; uniqueness: 0 site fbq track; GTM trackSingle; HTML sem meta-pixel",
        "gate3": gate3,
        "results": results,
        "notes": notes,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps(report, indent=2, ensure_ascii=False))
    print(f"\nGate 3: {'GREEN' if gate3 else 'RED'}")
    print(f"Wrote {OUT}")
    raise SystemExit(0 if gate3 else 1)


if __name__ == "__main__":
    main()
