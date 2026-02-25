import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    settings: {
      react: {
        version: "detect"
      },
      "import/resolver": {
        typescript: true
      }
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports
    },
    rules: {
      // === React & JSX Rules ===
      "react-hooks/rules-of-hooks": "error", // Enforce the Rules of Hooks (must be at top level, no conditional use, etc.)
      "react-refresh/only-export-components": "off", // Disable Fast Refresh export warnings
      "react/jsx-key": "error", // Ensure every element in a list has a unique "key" prop
      "react/react-in-jsx-scope": "off", // Do not require React to be in scope when using JSX (React 17+)
      "react/self-closing-comp": "error", // Enforce self-closing syntax for components without children
      "jsx-quotes": ["error", "prefer-double"], // Enforce double quotes in JSX attributes
      "react/jsx-curly-brace-presence": "error", // Disallow unnecessary JSX expressions (e.g. {"text"} → "text")
      "react/jsx-curly-spacing": "error", // Enforce consistent spacing inside JSX curly braces
      "react/jsx-no-duplicate-props": "error", // Disallow duplicate props in JSX elements
      "react/jsx-no-script-url": "error", // Disallow usage of "javascript:" URLs
      "react/jsx-no-target-blank": "error", // Forbid target="_blank" without rel="noreferrer"
      "react/jsx-no-undef": "error", // Disallow use of undefined JSX components or variables
      "react/jsx-pascal-case": "error", // Enforce PascalCase naming convention for JSX components
      "react/jsx-props-no-multi-spaces": "error", // Disallow multiple spaces between props
      "react/jsx-tag-spacing": "error", // Enforce consistent spacing around JSX opening/closing tag brackets
      "react-hooks/exhaustive-deps": "warn", // Warn when useEffect dependencies array is incomplete

      // === TypeScript Rules ===
      "@typescript-eslint/no-explicit-any": "off", // Allow usage of "any" type (can be set to 'warn' in stricter projects)

      // === Code Quality ===
      eqeqeq: ["error", "always"], // Enforce === and !== over == and !=
      "no-console": "off", // Warn on usage of console.log
      "no-var": "error", // Disallow var, require let/const
      "no-useless-catch": "off", // Allow unnecessary try/catch blocks (disabled warning)

      // === Code Hygiene ===
      "unused-imports/no-unused-imports": "warn" // Disallow unused imports (auto-fixable with --fix)
    }
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "out/",
      "coverage/",
      "public/",
      ".vite/",
      ".next/",
      "*.svg",
      "*.png",
      "*.jpg",
      "*.jpeg",
      "*.gif",
      "*.webp",
      "*.css",
      "*.scss",
      "*.sass",
      "*.less",
      "*.styl",
      "*.log",
      "*.lock",
      ".env",
      ".env.*",
      ".stylelintcache"
    ]
  }
);
