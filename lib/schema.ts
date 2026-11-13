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

/** Social profiles used in footer and LocalBusiness sameAs. */
export const AUDITIK_SAME_AS = [
  "https://www.facebook.com/auditik.piracicaba",
  "https://www.instagram.com/auditik.piracicaba",
  "https://www.youtube.com/@auditik",
] as const;

/** Clinic opening hours published on the home and Piracicaba page. */
export const CLINIC_OPENING_HOURS = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
  opens: "08:00",
  closes: "17:30",
};

export type ClinicLocationId =
  | "piracicaba"
  | "americana"
  | "sao-pedro"
  | "charqueada";

type AreaServedCity = {
  name: string;
  /** Wikidata Q-id for the municipality in São Paulo. */
  wikidataId: string;
};

const CLINIC_LOCATIONS: Record<
  ClinicLocationId,
  {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
    latitude: string;
    longitude: string;
    path: string;
    areaServed: AreaServedCity[];
  }
> = {
  piracicaba: {
    name: "Auditik - Clínica em Piracicaba",
    street: "Rua Samuel Neves, 1800",
    city: "Piracicaba",
    state: "SP",
    postalCode: "13420-000",
    phone: "(19) 3377-6941",
    latitude: "-22.7339",
    longitude: "-47.6492",
    path: "/aparelhos-auditivos-em-piracicaba/",
    areaServed: [
      { name: "Piracicaba", wikidataId: "Q330175" },
      { name: "Rio Claro", wikidataId: "Q291277" },
    ],
  },
  americana: {
    name: "Auditik - Clínica em Americana",
    street: "Rua Luíza Meneghel Mancine, 72 - Sala 12",
    city: "Americana",
    state: "SP",
    postalCode: "13460-000",
    phone: "(19) 3377-6941",
    latitude: "-22.7433",
    longitude: "-47.3299",
    path: "/aparelhos-auditivos-em-americana/",
    areaServed: [
      { name: "Americana", wikidataId: "Q467421" },
      { name: "Limeira", wikidataId: "Q841241" },
    ],
  },
  "sao-pedro": {
    name: "Auditik - Clínica em São Pedro",
    street: "Rua Malaquias Guerra, 290",
    city: "São Pedro",
    state: "SP",
    postalCode: "13520-000",
    phone: "(19) 3377-6941",
    latitude: "-22.5483",
    longitude: "-47.9139",
    path: "/aparelhos-auditivos-em-sao-pedro/",
    areaServed: [{ name: "São Pedro", wikidataId: "Q924342" }],
  },
  charqueada: {
    name: "Auditik - Clínica em Charqueada",
    street: "Avenida Brasil, 151",
    city: "Charqueada",
    state: "SP",
    postalCode: "13515-000",
    phone: "(19) 3377-6941",
    latitude: "-22.5094",
    longitude: "-47.7754",
    path: "/aparelhos-auditivos-em-charqueada/",
    areaServed: [{ name: "Charqueada", wikidataId: "Q983515" }],
  },
};

const CLINIC_LOCATION_IDS: ClinicLocationId[] = [
  "piracicaba",
  "americana",
  "sao-pedro",
  "charqueada",
];

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
  location: ClinicLocationId = "piracicaba",
) => {
  const loc = CLINIC_LOCATIONS[location];

  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}#${location}`,
    name: loc.name,
    image: absoluteAssetUrl(DEFAULT_LOGO_PATH),
    description: `Clínica de avaliação e tratamento auditivo com fonoaudiólogos e aparelhos Philips HearLink em ${loc.city}.`,
    url: absoluteUrl(loc.path),
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...CLINIC_OPENING_HOURS.days],
      opens: CLINIC_OPENING_HOURS.opens,
      closes: CLINIC_OPENING_HOURS.closes,
    },
    areaServed: loc.areaServed.map((city) => ({
      "@type": "City",
      name: city.name,
      "@id": `https://www.wikidata.org/wiki/${city.wikidataId}`,
    })),
    priceRange: "$$",
    sameAs: [...AUDITIK_SAME_AS],
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
    "@id": `${SITE_URL}#organization`,
    name: "Auditik",
    url: SITE_URL,
    logo: absoluteAssetUrl(DEFAULT_LOGO_PATH),
    description:
      "Distribuidor autorizado Philips HearLink de aparelhos auditivos na região de Piracicaba e Americana",
    telephone: "(19) 3377-6941",
    email: "atendimento@auditik.com.br",
    sameAs: [...AUDITIK_SAME_AS],
    location: CLINIC_LOCATION_IDS.map((id) => ({
      "@id": `${SITE_URL}#${id}`,
    })),
  };
};
