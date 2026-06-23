import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  SITE_URL,
  SATELLITE_SITE_URL,
  STATIC_ROUTES,
  SATELLITE_ROUTES,
  getBlogEntries,
  getConvenioEntries,
  truncateDescription,
  toAbsoluteUrl,
} from "./lib/content-index.mjs";

const ROOT = process.cwd();
const MAX_DESCRIPTION_LENGTH = 160;

const PRIMARY_PAGES = [
  {
    path: "/",
    title: "Página inicial",
    description:
      "Aparelhos auditivos Philips HearLink com IA avançada em Piracicaba e região",
  },
  {
    path: "/aparelhos/",
    title: "Aparelhos auditivos",
    description: "Linha Philips HearLink e avaliação auditiva gratuita",
  },
  {
    path: "/blog/",
    title: "Blog",
    description: "Artigos sobre saúde auditiva, aparelhos auditivos e qualidade de vida",
  },
  {
    path: "/convenios/",
    title: "Clube de Benefícios",
    description: "Parceiros com benefícios exclusivos para clientes Auditik",
  },
  {
    path: "/contato/",
    title: "Contato",
    description: "Agende sua avaliação auditiva gratuita",
  },
];

const OPTIONAL_PAGES = [
  {
    path: "/nossa-clinica/",
    title: "Nossa clínica",
    description: "Conheça a Auditik e nossa equipe",
  },
  {
    path: "/faq/",
    title: "Perguntas frequentes",
    description: "Dúvidas sobre aparelhos auditivos e atendimento",
  },
  {
    path: "/politica-de-privacidade/",
    title: "Política de privacidade",
    description: "Como tratamos dados pessoais",
  },
];

const SATELLITE_PAGE_LABELS = {
  "/aparelhos-auditivos-em-piracicaba/": "Aparelhos auditivos em Piracicaba",
  "/preco-aparelho-auditivo/": "Preço de aparelho auditivo",
  "/financiamento-aparelho-auditivo/": "Financiamento de aparelho auditivo",
  "/aparelho-auditivo-invisivel/": "Aparelho auditivo invisível",
  "/aparelho-auditivo-recarregavel/": "Aparelho auditivo recarregável",
  "/aparelho-auditivo-com-bluetooth/": "Aparelho auditivo com Bluetooth",
  "/aparelhos-auditivos-philips-hearing-solutions/":
    "Aparelhos auditivos Philips Hearing Solutions",
  "/aparelho-auditivo-para-idosos/": "Aparelho auditivo para idosos",
  "/como-saber-se-precisa-de-aparelho-auditivo/":
    "Como saber se precisa de aparelho auditivo",
  "/manutencao-e-ajuste-de-aparelho-auditivo/":
    "Manutenção e ajuste de aparelho auditivo",
};

function formatLink({ title, url, description }) {
  const note = truncateDescription(description, MAX_DESCRIPTION_LENGTH);
  if (note) {
    return `- [${title}](${url}): ${note}`;
  }
  return `- [${title}](${url})`;
}

function validateOutput(content) {
  const h1Matches = content.match(/^# .+$/gm) ?? [];

  if (h1Matches.length !== 1) {
    throw new Error(
      `llms.txt inválido: esperado 1 H1, encontrado ${h1Matches.length}.`,
    );
  }

  if (!content.startsWith("# Auditik\n")) {
    throw new Error('llms.txt inválido: deve começar com "# Auditik".');
  }

  if (!content.includes("\n> ")) {
    throw new Error("llms.txt inválido: blockquote de resumo ausente.");
  }
}

function run() {
  const blogEntries = getBlogEntries();
  const convenioEntries = getConvenioEntries();

  const lines = [
    "# Auditik",
    "",
    "> Distribuidor Philips HearLink em Piracicaba, Americana e região. Aparelhos auditivos com IA avançada, avaliação gratuita e clube de benefícios com parceiros locais.",
    "",
    "Site em português brasileiro (pt-BR). Páginas públicas podem ser indexadas e resumidas com atribuição à Auditik. Artigos do blog podem ser citados com link para a URL original.",
    "",
    "Contato: atendimento@auditik.com.br",
    "",
    "## Páginas principais",
    "",
    ...PRIMARY_PAGES.map((page) =>
      formatLink({
        title: page.title,
        url: toAbsoluteUrl(SITE_URL, page.path),
        description: page.description,
      }),
    ),
    "",
    "## Blog",
    "",
    ...blogEntries.map((entry) =>
      formatLink({
        title: entry.title,
        url: entry.url,
        description: entry.description,
      }),
    ),
    "",
    "## Convênios",
    "",
    ...convenioEntries.map((entry) =>
      formatLink({
        title: entry.title,
        url: entry.url,
        description: entry.description,
      }),
    ),
    "",
    "## Páginas satélite",
    "",
    ...SATELLITE_ROUTES.map((route) =>
      formatLink({
        title: SATELLITE_PAGE_LABELS[route.path] || route.path,
        url: toAbsoluteUrl(SATELLITE_SITE_URL, route.path),
        description: "Landing page sobre aparelhos auditivos Philips HearLink",
      }),
    ),
    "",
    "## Opcional",
    "",
    ...OPTIONAL_PAGES.map((page) =>
      formatLink({
        title: page.title,
        url: toAbsoluteUrl(SITE_URL, page.path),
        description: page.description,
      }),
    ),
    "",
  ];

  const content = lines.join("\n");
  validateOutput(content);
  writeFileSync(join(ROOT, "public", "llms.txt"), content, "utf8");
  // eslint-disable-next-line no-console
  console.log(
    `Generated llms.txt with ${blogEntries.length} blog article(s) and ${convenioEntries.length} convênio(s).`,
  );
}

run();
