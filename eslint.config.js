import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            semi: [
                2,
                "always"
            ],
            "space-before-function-paren": [
                "error",
                "never"
            ],
            "@typescript-eslint/no-unused-expressions": [
                "error",
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                    allowTaggedTemplates: true,
                }
            ],
        }
    }
];
