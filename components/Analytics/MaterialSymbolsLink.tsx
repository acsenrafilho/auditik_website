import Head from "next/head";
import { useRouter } from "next/router";

function isLandingPath(pathname: string): boolean {
  return pathname === "/lp" || pathname.startsWith("/lp/");
}

/**
 * Material Symbols webfont is heavy; skip it on paid-traffic landing pages
 * that use inline LandingIcon SVGs instead.
 */
export function MaterialSymbolsLink() {
  const router = useRouter();
  if (isLandingPath(router.pathname)) return null;

  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
