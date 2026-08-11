import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { APP_ROUTES } from "@lib/routes";

type LandingShellProps = {
  children: ReactNode;
};

/**
 * Minimal chrome for paid-traffic landing pages.
 * No institutional navigation — keeps focus on conversion.
 */
export function LandingShell({ children }: LandingShellProps) {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-slate-100 bg-white/90 py-4 backdrop-blur-md">
        <div className="container-wide flex items-center justify-center sm:justify-start">
          <Image
            src="/images/auditik/lp/americana/logo-auditik.webp"
            alt="Auditik - Soluções Auditivas"
            width={120}
            height={80}
            priority
            className="object-contain"
          />
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-slate-100 bg-slate-50 py-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-6">
        <div className="container-wide flex flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 sm:flex-row sm:text-left">
          <p>© {year} Auditik Soluções Auditivas</p>
          <Link
            href={APP_ROUTES.privacyPolicy}
            className="underline-offset-2 hover:text-auditik-blue hover:underline"
          >
            Política de Privacidade
          </Link>
        </div>
      </footer>
    </div>
  );
}
