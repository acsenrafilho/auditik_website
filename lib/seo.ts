// SEO utilities for meta tags and OpenGraph

export const DEFAULT_SEO = {
  title: "Auditik - Aparelhos Auditivos Philips HearLink",
  description:
    "Aparelhos auditivos Philips HearLink com IA avançada. Atendimento humanizado em Piracicaba, Americana, Limeira, Rio Claro e região. Agende sua avaliação gratuita!",
  canonical: "https://auditik.com.br",
  ogImage: "https://auditik.com.br/og-image.jpg",
  ogType: "website",
  twitterCard: "summary_large_image",
  keywords:
    "aparelhos auditivos, Philips HearLink, deficiência auditiva, Piracicaba, Americana",
};

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
}

export const getSEOMeta = (props: SEOProps = {}) => {
  const seo = { ...DEFAULT_SEO, ...props };

  return {
    title: seo.title,
    description: seo.description,
    canonical: seo.canonical,
    openGraph: {
      type: seo.ogType as "website" | "article",
      url: seo.canonical,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      siteName: "Auditik",
    },
    twitter: {
      cardType: seo.twitterCard,
      handle: "@auditik",
      site: "@auditik",
    },
    article: seo.article,
    keywords: seo.keywords,
  };
};
