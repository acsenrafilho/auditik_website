import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ensureTrailingSlash } from "@lib/routes";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const targetPath = ensureTrailingSlash(window.location.pathname);

    if (targetPath && targetPath !== window.location.pathname) {
      router.replace(`${targetPath}${window.location.search}${window.location.hash}`);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Página não encontrada | Auditik</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="min-h-screen flex items-center justify-center px-6 bg-white">
        <div className="max-w-xl text-center space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-auditik-blue">
            404
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            Página não encontrada
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Se você acessou um endereço sem a barra final, o site vai tentar
            redirecionar automaticamente para a versão correta. Se não funcionar, volte
            para a página inicial.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-auditik-yellow px-6 py-3 text-white font-semibold"
          >
            Ir para a página inicial
          </a>
        </div>
      </main>
    </>
  );
}
