import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Header } from "@components/Header";
import {
  CONVERSION_GOALS,
  trackConversion,
  trackEvent,
} from "@lib/analytics";
import { APP_ROUTES } from "@lib/routes";
import { getSEOMeta } from "@lib/seo";
import { absoluteUrl } from "@lib/site-url";
import { consumeThankYouToken, type ThankYouToken } from "@lib/thank-you";

export default function ObrigadoPage() {
  const [token, setToken] = useState<ThankYouToken | null>(null);
  const [checked, setChecked] = useState(false);
  const conversionFired = useRef(false);

  const seo = getSEOMeta({
    title: "Obrigado — recebemos seus dados",
    description:
      "Recebemos seus dados. Nossa equipe da Auditik entrará em contato em breve.",
    canonical: absoluteUrl(APP_ROUTES.obrigado),
    noindex: true,
  });

  useEffect(() => {
    const consumed = consumeThankYouToken();

    if (!consumed) {
      window.location.replace(APP_ROUTES.contato);
      return;
    }

    setToken(consumed);
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!token || conversionFired.current) return;

    conversionFired.current = true;

    const baseParams = {
      page: "obrigado",
      page_type: "thank_you",
      lead_source: token.source,
      form_name: token.form,
    };

    if (token.form === "contact") {
      trackConversion(CONVERSION_GOALS.CONTACT_FORM_SUBMIT, baseParams);
      return;
    }

    trackConversion(CONVERSION_GOALS.WHATSAPP_LEAD_SUBMITTED, baseParams);
  }, [token]);

  const handleOpenWhatsApp = () => {
    if (!token?.whatsappUrl) return;

    trackEvent("button_click", {
      button_name: "thank_you_whatsapp_continue",
      page: "obrigado",
      page_type: "thank_you",
      lead_source: token.source,
    });

    window.open(token.whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (!checked) {
    return (
      <>
        <NextSeo {...seo} noindex nofollow />
        <Head>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <div className="flex min-h-screen items-center justify-center bg-white">
          <p className="text-sm text-slate-500">Carregando...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NextSeo {...seo} noindex nofollow />
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <Header />

      <main className="bg-bg-light-blue py-16 md:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-xl rounded-4xl border border-blue-50 bg-white p-8 shadow-xl shadow-blue-900/5 md:p-12">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
                <path
                  d="M20 7L9 18l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900">
              Recebemos seus dados
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Obrigado! Nossa equipe vai priorizar seu atendimento e entrará em contato
              em breve para agendar sua avaliação auditiva gratuita.
            </p>

            <div className="mt-8 space-y-3 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">O que acontece agora?</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Nossa equipe analisa seu pedido com atenção.</li>
                <li>Entramos em contato pelo telefone informado.</li>
                <li>Você agenda sua avaliação na unidade mais conveniente.</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={APP_ROUTES.home}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Voltar ao início
              </Link>

              {token?.whatsappUrl ? (
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-auditik-yellow px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-yellow-400"
                >
                  Continuar no WhatsApp
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
