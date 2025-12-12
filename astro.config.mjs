// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  // Production URL
  site: "https://marketing.bizibox.eu",

  i18n: {
    // Default language of the site
    defaultLocale: "fr",
    // All supported locales
    locales: ["fr", "en", "de"],
    // Keep the default root strategy (recommended)
    // Ensure have a standard and compatible behavior
    routing: {
      // Important : we want to prefix all locales
      // (including the default language)
      prefixDefaultLocale: true,
      // Disable automatic redirect to show content immediately
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) =>
        // Exclude root redirect page
        page !== "https://marketing.bizibox.eu/" &&
        // Exclude legal pages (all languages)
        !page.includes("/legal") &&
        // Exclude privacy pages (all languages)
        !page.includes("/privacy") &&
        // Exclude cookies pages (all languages)
        !page.includes("/cookies") &&
        // Exclude success pages (all languages)
        !page.includes("/success"),
      i18n: {
        defaultLocale: "fr",
        locales: {
          fr: "fr-FR",
          en: "en-US",
          de: "de-DE",
        },
      },
      lastmod: new Date(),
      serialize(item) {
        // Add x-default hreflang for default locale
        if (item.links && item.url.includes("/fr/")) {
          item.links.push({
            url: item.url,
            lang: "x-default",
          });
        }
        return item;
      },
    }),
  ],
});
