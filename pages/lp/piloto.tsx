import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { LandingShell } from "@components/Landing";
import { getSEOMeta } from "@lib/seo";
import { absoluteUrl } from "@lib/site-url";
import { LP_ROUTES } from "@lib/routes";

const PLACEHOLDER_IMAGE =
  "/images/auditik/background/sala_atendimento.webp";

export default function LpPilotoPage() {
  const seo = getSEOMeta({
    title: "Landing page — rascunho",
    description:
      "Página placeholder do silo de landing pages de tráfego pago da Auditik.",
    canonical: absoluteUrl(LP_ROUTES.piloto),
    noindex: true,
  });

  return (
    <>
      <NextSeo {...seo} noindex nofollow />
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <LandingShell>
        <main className="container-wide py-12 md:py-16">
          <h1 className="mb-8 text-center text-2xl font-extrabold text-slate-900 md:text-3xl">
            Landing page — rascunho
          </h1>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl">
            <Image
              src={PLACEHOLDER_IMAGE}
              alt="Sala de atendimento Auditik"
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </main>
      </LandingShell>
    </>
  );
}
