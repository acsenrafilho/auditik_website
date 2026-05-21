export const APP_ROUTES = {
  home: "/",
  aparelhos: "/aparelhos/",
  blog: "/blog/",
  convenios: "/convenios/",
  contato: "/contato/",
  nossaClinica: "/nossa-clinica/",
  faq: "/faq/",
  privacyPolicy: "/politica-de-privacidade/",
} as const;

/** Satellite landing pages in the aparelhos SEO silo (see pages/subs-aparelhos/). */
export const SUBS_APARELHOS_ROUTES = {
  piracicaba: "/aparelhos-auditivos-em-piracicaba/",
  preco: "/preco-aparelho-auditivo/",
  financiamento: "/financiamento-aparelho-auditivo/",
  invisivel: "/aparelho-auditivo-invisivel/",
  recarregavel: "/aparelho-auditivo-recarregavel/",
  bluetooth: "/aparelho-auditivo-com-bluetooth/",
  philipsHearingSolutions: "/aparelhos-auditivos-philips-hearing-solutions/",
  idosos: "/aparelho-auditivo-para-idosos/",
} as const;

export const ensureTrailingSlash = (path: string) => {
  if (!path || path === "/" || path.endsWith("/") || path.includes(".")) {
    return path;
  }

  return `${path}/`;
};
