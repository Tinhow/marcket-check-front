import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginVue from "eslint-plugin-vue";

export default {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts}"],
      languageOptions: {
        globals: { ...globals.browser, ...globals.node },
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: "module"
        }
      },
      extends: [
        pluginJs.configs.recommended,
        ...tseslint.configs.recommended
      ],
      plugins: [
        "@typescript-eslint"
      ],
      rules: {
        // Suas regras personalizadas para arquivos JS e TS
      }
    },
    {
      files: ["**/*.vue"],
      languageOptions: {
        globals: { ...globals.browser, ...globals.node },
        parserOptions: {
          parser: tseslint.parser
        }
      },
      extends: [
        ...pluginVue.configs["flat/essential"],
        ...tseslint.configs.recommended
      ],
      plugins: [
        "vue",
        "@typescript-eslint"
      ],
      rules: {
        // Suas regras personalizadas para arquivos Vue
      }
    }
  ]
};
