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

export const ensureTrailingSlash = (path: string) => {
  if (!path || path === "/" || path.endsWith("/") || path.includes(".")) {
    return path;
  }

  return `${path}/`;
};
