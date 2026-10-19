import Link from "next/link";
import { SUBS_APARELHOS_ROUTES } from "@lib/routes";

const LINKS = [
  { href: SUBS_APARELHOS_ROUTES.piracicaba, label: "Clínica em Piracicaba" },
  { href: SUBS_APARELHOS_ROUTES.americana, label: "Clínica em Americana" },
  { href: SUBS_APARELHOS_ROUTES.saoPedro, label: "Clínica em São Pedro" },
  { href: SUBS_APARELHOS_ROUTES.charqueada, label: "Clínica em Charqueada" },
  { href: SUBS_APARELHOS_ROUTES.limeira, label: "Atendimento para Limeira" },
  { href: SUBS_APARELHOS_ROUTES.rioClaro, label: "Atendimento para Rio Claro" },
];

export function ClinicCityLinks({ currentPath }: { currentPath?: string }) {
  const links = LINKS.filter((link) => link.href !== currentPath);

  return (
    <section className="py-16 bg-white">
      <div className="container-wide">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
          Clínicas de tratamento auditivo
        </h2>
        <p className="text-slate-600 text-lg text-center max-w-2xl mx-auto mb-10">
          Avaliação, adaptação e acompanhamento com fonoaudiólogos. Limeira e Rio
          Claro são atendidas nas unidades mais próximas.
        </p>
        <ul className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full bg-bg-light-blue px-5 py-3 text-sm font-bold text-auditik-blue hover:bg-auditik-blue hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
