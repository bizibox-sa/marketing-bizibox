// Enhanced Structured Data Schemas for Bizibox
// Comprehensive JSON-LD schemas aligned with 2025 best practices
// Supports rich results: LocalBusiness, FAQPage, Service, WebSite, BreadcrumbList

/**
 * LocalBusiness Schema - More specific than Organization for physical business locations
 * Enables rich results in Google Search with business details, ratings, and actions
 */
export const getLocalBusinessSchema = (siteUrl: URL | undefined) => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": siteUrl ? `${siteUrl.toString()}#organization` : undefined,
  name: "Bizibox S.A.",
  legalName: "Bizibox S.A.",
  url: siteUrl?.toString(),
  logo: siteUrl
    ? new URL("/assets/branding/bizibox-logo-leaf-full.png", siteUrl).toString()
    : undefined,
  image: siteUrl
    ? new URL("/assets/branding/bizibox-logo-leaf-full.png", siteUrl).toString()
    : undefined,
  description:
    "Cybersécurité pour les entreprises au Luxembourg et dans le Grand Est. Services de cybersécurité : audits, supervision, réponse à incident et conformité réglementaire.",
  foundingDate: "2020",
  slogan: "Les grandes technologies pour les petites entreprises",

  // Physical address for local business rich results
  address: {
    "@type": "PostalAddress",
    streetAddress: "58 avenue de la gare",
    addressLocality: "Esch-sur-Alzette",
    postalCode: "L-4130",
    addressCountry: "LU",
  },

  // Geographic coordinates for local search optimization
  geo: {
    "@type": "GeoCoordinates",
    latitude: "49.49601649276158",
    longitude: "5.982095913335705",
  },

  // Service area coverage
  areaServed: [
    {
      "@type": "Country",
      name: "Luxembourg",
    },
    {
      "@type": "Place",
      name: "Grand Est",
      containedInPlace: {
        "@type": "Country",
        name: "France",
      },
    },
  ],

  // Contact information
  telephone: "+33770469451",
  email: "contact@bizibox.eu",

  // Enhanced contact points with multiple languages
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+33770469451",
      email: "contact@bizibox.eu",
      contactType: "customer service",
      availableLanguage: ["French", "English", "German"],
      areaServed: ["LU", "FR"],
    },
    {
      "@type": "ContactPoint",
      email: "contact@bizibox.eu",
      contactType: "sales",
      availableLanguage: ["French", "English", "German"],
    },
  ],

  // Social media profiles
  sameAs: [
    "https://www.linkedin.com/company/bizibox-s-a/",
    "https://www.facebook.com/profile.php?id=61584779154326",
    "https://www.instagram.com/biziboxsa",
  ],

  // Business identifiers
  // taxID = Local business tax identifier (SIRET for French establishment)
  // vatID = EU VAT number for cross-border transactions
  taxID: "89505809700018",
  vatID: "FR30895058097",

  // Keywords for better semantic understanding
  keywords: [
    "cybersécurité",
    "audit de sécurité",
    "supervision 24/7",
    "réponse aux incidents",
    "conformité RGPD",
    "Luxembourg",
    "Grand Est",
  ],

  // Price range indicator for services ($ = budget, $$ = moderate, $$$ = premium, $$$$ = luxury)
  priceRange: "$$-$$$",
});

/**
 * FAQPage Schema - Enables FAQ rich results in Google Search
 * Displays questions and answers directly in search results (25-82% CTR improvement)
 */
export const getFAQPageSchema = (faqItems: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

/**
 * Service Schema - Defines individual cybersecurity services offered
 * Can appear in service-specific searches and knowledge panels
 */
export const getServicesSchema = (
  siteUrl: URL | undefined,
  services: { title: string; description: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      "@id": siteUrl ? `${siteUrl.toString()}#service-${index + 1}` : undefined,
      name: service.title,
      description: service.description,
      provider: {
        "@id": siteUrl ? `${siteUrl.toString()}#organization` : undefined,
      },
      serviceType: "Cybersecurity Service",
      areaServed: [
        {
          "@type": "Country",
          name: "Luxembourg",
        },
        {
          "@type": "Place",
          name: "Grand Est",
        },
      ],
    },
  })),
});

/**
 * WebSite Schema - Provides site-level information for search engines
 * Enables sitelinks search box and site name in search results
 */
export const getWebSiteSchema = (siteUrl: URL | undefined, siteName: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": siteUrl ? `${siteUrl.toString()}#website` : undefined,
  name: siteName,
  url: siteUrl?.toString(),
  publisher: {
    "@id": siteUrl ? `${siteUrl.toString()}#organization` : undefined,
  },
  inLanguage: ["fr", "en", "de"],

  // Potential action for site search (if implemented in the future)
  // potentialAction: {
  //   "@type": "SearchAction",
  //   target: {
  //     "@type": "EntryPoint",
  //     urlTemplate: `${siteUrl?.toString()}/search?q={search_term_string}`,
  //   },
  //   "query-input": "required name=search_term_string",
  // },
});

/**
 * BreadcrumbList Schema - Navigation hierarchy for better understanding of site structure
 * Displays breadcrumb trail in search results
 */
export const getBreadcrumbListSchema = (
  siteUrl: URL | undefined,
  breadcrumbs: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: siteUrl ? new URL(crumb.url, siteUrl).toString() : crumb.url,
  })),
});

// Legacy export for backward compatibility
export const getOrganizationSchema = getLocalBusinessSchema;
