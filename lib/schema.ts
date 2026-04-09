// JSON-LD Schema generation utilities for SEO and LLM indexing

export const generateLocalBusinessSchema = (location: 'piracicaba' | 'americana' = 'piracicaba') => {
  const locations = {
    piracicaba: {
      name: 'Auditik - Piracicaba',
      street: 'Rua de Cavvarteira, 320',
      city: 'Piracicaba',
      state: 'SP',
      postalCode: '13400-000',
      phone: '(91) 9977-4156',
      latitude: '-22.7339',
      longitude: '-47.6492',
    },
    americana: {
      name: 'Auditik - Americana',
      street: 'Rua Praras de Carellho, 3338',
      city: 'Americana',
      state: 'SP',
      postalCode: '13460-000',
      phone: '(91) 9977-4156',
      latitude: '-22.7433',
      longitude: '-47.3299',
    },
  };

  const loc = locations[location];

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://auditik.com.br#${location}`,
    name: loc.name,
    image: 'https://auditik.com.br/logo.png',
    description: 'Clínica de aparelhos auditivos Philips HearLink em Piracicaba e Americana',
    url: 'https://auditik.com.br',
    telephone: loc.phone,
    email: 'atendimento@auditik.com.br',
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.street,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.postalCode,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.latitude,
      longitude: loc.longitude,
    },
    priceRange: '$$',
    sameAs: [
      'https://www.facebook.com/auditik',
      'https://www.instagram.com/auditik',
    ],
  };
};

export const generateProductSchema = (product: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name || 'Philips HearLink',
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'Philips',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Philips',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: product.price || 'Entre em contato',
    },
  };
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const generateArticleSchema = (article: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author || 'Auditik Equipe',
    },
    datePublished: article.date,
    dateModified: article.modified || article.date,
    articleBody: article.content,
  };
};

export const generateAggregateRatingSchema = (reviews: any[]) => {
  const rating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: rating.toFixed(1),
    ratingCount: reviews.length,
    bestRating: '5',
    worstRating: '1',
  };
};

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Auditik',
    url: 'https://auditik.com.br',
    logo: 'https://auditik.com.br/logo.png',
    description: 'Distribuidor licenciado Philips HearLink de aparelhos auditivos',
    telephone: '(91) 9977-4156',
    email: 'atendimento@auditik.com.br',
    sameAs: [
      'https://www.facebook.com/auditik',
      'https://www.instagram.com/auditik',
    ],
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Piracicaba',
        addressRegion: 'SP',
        addressCountry: 'BR',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Americana',
        addressRegion: 'SP',
        addressCountry: 'BR',
      },
    ],
  };
};
