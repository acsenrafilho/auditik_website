// SEO utilities for meta tags and OpenGraph

import {
  SITE_URL,
  absoluteAssetUrl,
  absoluteUrl,
  DEFAULT_OG_IMAGE_PATH,
} from "@lib/site-url";

export const DEFAULT_SEO = {
  title: "Auditik - Aparelhos Auditivos Philips HearLink",
  description:
    "Aparelhos auditivos Philips HearLink com IA avançada. Atendimento humanizado em Piracicaba, Americana, Limeira, Rio Claro e região. Agende sua avaliação gratuita!",
  canonical: SITE_URL,
  ogImage: absoluteAssetUrl(DEFAULT_OG_IMAGE_PATH),
  ogType: "website",
  twitterCard: "summary_large_image",
  keywords:
    "aparelhos auditivos, Philips HearLink, deficiência auditiva, Piracicaba, Americana",
};

export const INDEX_ROBOTS_META =
  "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1";

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
}

export const getSEOMeta = (props: SEOProps = {}) => {
  const seo = { ...DEFAULT_SEO, ...props };
  const canonical = seo.canonical || SITE_URL;
  const ogImage = seo.ogImage
    ? absoluteAssetUrl(seo.ogImage, SITE_URL)
    : DEFAULT_SEO.ogImage;

  const additionalMetaTags = seo.noindex
    ? [{ name: "robots", content: "noindex,nofollow" }]
    : [{ name: "robots", content: INDEX_ROBOTS_META }];

  return {
    title: seo.title,
    description: seo.description,
    canonical,
    openGraph: {
      type: seo.ogType as "website" | "article",
      url: canonical,
      title: seo.title,
      description: seo.description,
      locale: "pt_BR",
      images: [
        {
          url: ogImage,
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
    additionalMetaTags,
  };
};

export { absoluteUrl };
