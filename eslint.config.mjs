import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astroPlugin from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  // Ignore build and dependency folders
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**"],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript (recommended + stylistic, without heavy type-checking)
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // Astro: official flat config for Astro projects
  ...astroPlugin.configs["flat/recommended"],
  ...astroPlugin.configs["flat/jsx-a11y-strict"],

  // Accessibility rules for JSX in Astro components
  // Integrate jsx-a11y plugin and enable recommended rules
  // Note: Astro uses native HTML attributes (for, class) not JSX (htmlFor, className)
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      // Disable label-has-associated-control for Astro
      // Astro uses native HTML 'for' attribute, not JSX 'htmlFor'
      "jsx-a11y/label-has-associated-control": "off",
      // Use the standard HTML label-has-for rule instead
    },
  },

  // ===== PROJECT RULES =====
  // Enable TypeScript-specific rule with custom options
  // Warn on unused variables
  // Ignore variables starting with _
  // Warn on console.log, allow console.warn/error
  // Disable requirement for explicit return types
  {
    rules: {
      "no-unused-vars": "off",

      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      "no-console": ["warn", { allow: ["warn", "error"] }],

      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
];
