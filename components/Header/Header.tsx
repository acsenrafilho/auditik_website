import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { trackButtonClick } from "@lib/analytics";

export function Header() {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") {
      return true;
    }
    if (path !== "/" && currentPath.startsWith(path)) {
      return true;
    }
    return false;
  };

  const navLinks = [
    { href: "/", label: "Página Inicial" },
    { href: "/nossa-clinica", label: "Nossa Clínica" },
    { href: "/aparelhos", label: "Aparelhos Auditivos" },
    { href: "/convenios", label: "Convênios" },
    { href: "/blog", label: "Artigos" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 py-4">
      <div className="container-wide flex justify-between items-center">
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
          className="lg:hidden text-auditik-blue"
          onClick={() => trackButtonClick("mobile_menu", { section: "header" })}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}
