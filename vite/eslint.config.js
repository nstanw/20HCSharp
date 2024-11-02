import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "prefer-const": "warn",
            "@typescript-eslint/no-unused-expressions": ["warn", { allowShortCircuit: true, allowTernary: true }],
            "@typescript-eslint/no-explicit-any": "warn",
            "no-extra-boolean-cast": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "no-var": "off",
            "@typescript-eslint/no-this-alias": "off",
            "no-control-regex": "off",
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "react-refresh/only-export-components": ["off", { allowConstantExport: true }],
            "react-hooks/exhaustive-deps": "off",
            ...reactHooks.configs.recommended.rules,
        },
    }
);
