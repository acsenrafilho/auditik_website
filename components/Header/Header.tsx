import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trackButtonClick } from "@lib/analytics";
import { APP_ROUTES } from "@lib/routes";

export function Header() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileMenuOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  const normalizePath = (path: string) => {
    if (path === "/") {
      return "/";
    }

    return path.endsWith("/") ? path.slice(0, -1) : path;
  };

  const isActive = (path: string) => {
    const normalizedCurrentPath = normalizePath(currentPath);
    const normalizedPath = normalizePath(path);

    if (normalizedPath === "/" && normalizedCurrentPath === "/") {
      return true;
    }

    if (normalizedPath !== "/" && normalizedCurrentPath.startsWith(normalizedPath)) {
      return true;
    }
    return false;
  };

  const navLinks = [
    { href: APP_ROUTES.home, label: "Página Inicial" },
    { href: APP_ROUTES.nossaClinica, label: "Nossa Clínica" },
    { href: APP_ROUTES.aparelhos, label: "Aparelhos Auditivos" },
    { href: APP_ROUTES.convenios, label: "Clube de Benefícios" },
    { href: APP_ROUTES.blog, label: "Artigos" },
    { href: APP_ROUTES.contato, label: "Contato" },
  ];

  const handleMobileMenuToggle = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);
    trackButtonClick(nextState ? "mobile_menu_open" : "mobile_menu_close", {
      section: "header",
    });
  };

  const handleMobileNavClick = (href: string) => {
    trackButtonClick("mobile_menu_nav_link", {
      section: "header",
      destination: href,
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md py-4">
      <div className="container-wide flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="transform group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo-auditik.png"
              alt="Auditik - Soluções Auditivas"
              width={120}
              height={80}
              priority
              className="object-contain"
            />
          </div>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`transition-all pb-1 border-b-2 ${
                    isActive(href)
                      ? "text-auditik-blue border-auditik-blue"
                      : "border-transparent hover:text-auditik-blue hover:border-auditik-blue/30"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Fechar menu principal" : "Abrir menu principal"}
          aria-haspopup="true"
          aria-controls="mobile-navigation"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-auditik-blue lg:hidden"
          onClick={handleMobileMenuToggle}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {isMobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="mt-2 w-full rounded-[1.75rem] border border-slate-100 bg-white/98 p-3 shadow-2xl shadow-slate-900/10 lg:hidden"
          >
            <ul className="grid gap-2 text-sm font-bold uppercase tracking-widest text-slate-600">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => handleMobileNavClick(href)}
                    className={`flex min-h-12 items-center rounded-2xl px-4 py-3 transition-colors ${
                      isActive(href)
                        ? "bg-auditik-blue/10 text-auditik-blue"
                        : "hover:bg-slate-50 hover:text-auditik-blue"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
