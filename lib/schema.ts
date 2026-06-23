// JSON-LD Schema generation utilities for SEO and LLM indexing

import {
  SITE_URL,
  absoluteAssetUrl,
  absoluteUrl,
  DEFAULT_LOGO_PATH,
} from "@lib/site-url";

export interface ArticleSchemaInput {
  title: string;
  description: string;
  image?: string;
  author?: string;
  date: string;
  modified?: string;
  url: string;
}

export interface IndexListItem {
  title: string;
  url: string;
}

function generateOrganizationPublisher() {
  return {
    "@type": "Organization",
    name: "Auditik",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteAssetUrl(DEFAULT_LOGO_PATH),
    },
  };
}

export const generateLocalBusinessSchema = (
  location: "piracicaba" | "americana" = "piracicaba",
) => {
  const locations = {
    piracicaba: {
      name: "Auditik - Piracicaba",
      street: "Rua Samuel Neves, 1800",
      city: "Piracicaba",
      state: "SP",
      postalCode: "13420-000",
      phone: "(19) 3377-6941",
      latitude: "-22.7339",
      longitude: "-47.6492",
    },
    americana: {
      name: "Auditik - Americana",
      street: "Rua Luíza Meneghel Mancine, 72 - Sala 12",
      city: "Americana",
      state: "SP",
      postalCode: "13460-000",
      phone: "(19) 3377-6941",
      latitude: "-22.7433",
      longitude: "-47.3299",
    },
  };

  const loc = locations[location];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#${location}`,
    name: loc.name,
    image: absoluteAssetUrl(DEFAULT_LOGO_PATH),
    description:
      "Clínica de aparelhos auditivos Philips HearLink em Piracicaba e Americana",
    url: SITE_URL,
    telephone: loc.phone,
    email: "atendimento@auditik.com.br",
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.postalCode,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.latitude,
      longitude: loc.longitude,
    },
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/auditik.piracicaba",
      "https://www.instagram.com/auditik.piracicaba",
    ],
  };
};

export const generateProductSchema = (product: {
  name?: string;
  description?: string;
  image?: string;
  price?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name || "Philips HearLink",
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: "Philips",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Philips",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price || "Entre em contato",
    },
  };
};

export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>,
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

export const generateArticleSchema = (article: ArticleSchemaInput) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.image
      ? absoluteAssetUrl(article.image)
      : absoluteAssetUrl(DEFAULT_LOGO_PATH),
    author: {
      "@type": "Person",
      name: article.author || "Auditik Equipe",
    },
    publisher: generateOrganizationPublisher(),
    datePublished: article.date,
    dateModified: article.modified || article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
};

export const generateBlogIndexSchema = (
  posts: IndexListItem[],
  options: { name?: string; description?: string; url?: string } = {},
) => {
  const blogUrl = options.url || absoluteUrl("/blog/");

  return [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: options.name || "Blog - Auditik",
      description:
        options.description ||
        "Blog sobre saúde auditiva, aparelhos auditivos Philips HearLink e qualidade de vida.",
      url: blogUrl,
      inLanguage: "pt-BR",
      publisher: generateOrganizationPublisher(),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: post.url,
        name: post.title,
      })),
    },
  ];
};

export const generateConveniosIndexSchema = (
  partners: IndexListItem[],
  options: { name?: string; description?: string; url?: string } = {},
) => {
  const pageUrl = options.url || absoluteUrl("/convenios/");

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: options.name || "Clube de Benefícios Auditik",
      description:
        options.description ||
        "Parcerias e benefícios exclusivos para clientes Auditik.",
      url: pageUrl,
      inLanguage: "pt-BR",
      publisher: generateOrganizationPublisher(),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: partners.map((partner, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: partner.url,
        name: partner.title,
      })),
    },
  ];
};

export interface ConvenioSchemaInput {
  name: string;
  description: string;
  slug: string;
  logo?: string;
}

export const generateConvenioPartnerSchema = (partner: ConvenioSchemaInput) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: partner.name,
    description: partner.description,
    url: absoluteUrl(`/convenios/${partner.slug}/`),
    logo: partner.logo ? absoluteAssetUrl(partner.logo) : undefined,
  };
};

export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateAggregateRatingSchema = (reviews: Array<{ rating: number }>) => {
  const rating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: rating.toFixed(1),
    ratingCount: reviews.length,
    bestRating: "5",
    worstRating: "1",
  };
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Auditik",
    url: SITE_URL,
    logo: absoluteAssetUrl(DEFAULT_LOGO_PATH),
    description: "Distribuidor licenciado Philips HearLink de aparelhos auditivos",
    telephone: "(19) 3377-6941",
    email: "atendimento@auditik.com.br",
    sameAs: ["https://www.facebook.com/auditik", "https://www.instagram.com/auditik"],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Piracicaba",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Americana",
        addressRegion: "SP",
        addressCountry: "BR",
      },
    ],
  };
};
