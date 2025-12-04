/** @type {import("prettier").Config} */

const config = {
  semi: true, // Use semicolons at the ends of statements
  singleQuote: false, // Use double quotes instead of single quotes
  trailingComma: "es5", // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  printWidth: 100, // Specify the line length that the printer will wrap on
  tabWidth: 2, // Specify the number of spaces per indentation level
  useTabs: false, // Indent lines with spaces instead of tabs
  bracketSpacing: true, // Print spaces between brackets in object literals
  arrowParens: "always", // Always include parentheses around arrow function arguments

  // Plugins for astro and tailwindcss support
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],

  // Overrides for astro files = to use the correct astro parser
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

export default config;
