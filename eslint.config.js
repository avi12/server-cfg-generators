import expandNestedObjectExpression from "./eslint-rules/expand-nested-object-expression.js";
import expandNestedTypeLiteral from "./eslint-rules/expand-nested-type-literal.js";
import multilineArgParenNewline from "./eslint-rules/multiline-arg-paren-newline.js";
import noPaddedTag from "./eslint-rules/no-padded-tag.js";
import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import importNewlines from "eslint-plugin-import-newlines";
import perfectionist from "eslint-plugin-perfectionist";
import vuePlugin from "eslint-plugin-vue";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tsEslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

const tsStyleRules = {
  "import/first": "error",
  "import/order": "off",
  "prefer-const": "error",
  "perfectionist/sort-imports": [
    "error",
    {
      type: "alphabetical",
      order: "asc",
      newlinesBetween: "ignore",
      sortSideEffects: true,
      groups: [["side-effect", "builtin", "external", "internal", "parent", "sibling", "index", "unknown"]]
    }
  ],
  "@stylistic/quotes": ["error", "double", { allowTemplateLiterals: "always" }],
  "@stylistic/quote-props": ["error", "as-needed"],
  "@stylistic/semi": ["error"],
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      varsIgnorePattern: "^_",
      argsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_"
    }
  ],
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "interface",
      format: ["PascalCase"],
      custom: {
        regex: "^I[A-Z]",
        match: false
      }
    },
    {
      selector: "variable",
      types: ["boolean"],
      format: ["PascalCase"],
      prefix: ["is"]
    }
  ],
  "@typescript-eslint/prefer-for-of": "error",
  curly: ["error", "all"],
  "@stylistic/indent": ["error", 2],
  "@stylistic/arrow-parens": ["error", "as-needed"],
  "@stylistic/object-curly-spacing": ["error", "always"],
  "@stylistic/brace-style": "error",
  "@stylistic/comma-dangle": ["error", "never"],
  "@stylistic/no-trailing-spaces": "error",
  "@stylistic/eol-last": ["error", "always"],
  "@stylistic/no-multiple-empty-lines": [
    "error",
    {
      max: 1,
      maxEOF: 0,
      maxBOF: 0
    }
  ],
  "@stylistic/comma-spacing": [
    "error",
    {
      before: false,
      after: true
    }
  ],
  "@stylistic/key-spacing": [
    "error",
    {
      beforeColon: false,
      afterColon: true
    }
  ],
  "@stylistic/keyword-spacing": [
    "error",
    {
      before: true,
      after: true
    }
  ],
  "@stylistic/space-before-blocks": "error",
  "@stylistic/space-before-function-paren": [
    "error",
    {
      named: "never",
      asyncArrow: "always",
      catch: "always"
    }
  ],
  "@stylistic/space-infix-ops": "error",
  "@stylistic/space-in-parens": ["error", "never"],
  "@stylistic/array-bracket-spacing": ["error", "never"],
  "@stylistic/computed-property-spacing": ["error", "never"],
  "@stylistic/template-curly-spacing": ["error", "never"],
  "@stylistic/block-spacing": ["error", "always"],
  "@stylistic/semi-spacing": [
    "error",
    {
      before: false,
      after: true
    }
  ],
  "@stylistic/no-extra-semi": "error",
  "@stylistic/type-annotation-spacing": "error",
  "@stylistic/member-delimiter-style": [
    "error",
    {
      multiline: {
        delimiter: "semi",
        requireLast: true
      },
      singleline: {
        delimiter: "semi",
        requireLast: false
      }
    }
  ],
  "@stylistic/no-mixed-spaces-and-tabs": "error",
  "@stylistic/no-tabs": "error",
  "@stylistic/max-len": [
    "error",
    {
      code: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }
  ],
  "@stylistic/padded-blocks": ["error", "never"],
  "@stylistic/rest-spread-spacing": ["error", "never"],
  "@stylistic/spaced-comment": ["error", "always"],
  "import-newlines/enforce": [
    "error",
    {
      items: 4,
      "max-len": 120,
      forceSingleLine: true
    }
  ],
  "@stylistic/object-curly-newline": [
    "error",
    {
      ObjectExpression: {
        consistent: true,
        multiline: true
      },
      ObjectPattern: {
        consistent: true,
        multiline: true
      },
      ExportDeclaration: {
        consistent: true,
        multiline: true
      }
    }
  ],
  "@stylistic/object-property-newline": ["error", { allowAllPropertiesOnSameLine: false }],
  "id-length": [
    "error",
    {
      min: 3,
      exceptions: ["z", "_", "i", "fs", "id", "os", "e", "db", "mi", "ui", "HL", "GL", "js", "q", "to", "dd", "mm", "x", "y", "d"],
      properties: "never"
    }
  ],
  "func-style": ["error", "declaration", { allowArrowFunctions: false }],
  "no-restricted-syntax": [
    "error",
    {
      selector: "VariableDeclarator > ArrowFunctionExpression",
      message: "Do not assign arrow functions to variables. Use a named function declaration instead."
    },
    {
      selector: "ForOfStatement > CallExpression[callee.object.name='Object'][callee.property.name='keys']",
      message: "Use a for-in loop instead of for-of Object.keys()."
    },
    {
      selector: "MemberExpression[object.name='Reflect']",
      message: "Do not use Reflect. Use direct property access instead."
    }
  ],
  "@stylistic/padding-line-between-statements": [
    "error",
    {
      blankLine: "always",
      prev: "import",
      next: ["const", "let", "function", "export", "type"]
    },
    {
      blankLine: "any",
      prev: "import",
      next: "import"
    },
    {
      blankLine: "always",
      prev: "*",
      next: "if"
    },
    {
      blankLine: "never",
      prev: ["const", "let"],
      next: "if"
    },
    {
      blankLine: "always",
      prev: "if",
      next: "*"
    }
  ],
  "no-restricted-properties": [
    "error",
    {
      object: "Number",
      property: "parseInt",
      message: "Use parseInt() instead."
    },
    {
      object: "Number",
      property: "parseFloat",
      message: "Use parseFloat() instead."
    }
  ],
  "no-control-regex": "off",
  "object-shorthand": ["error", "always", { avoidExplicitReturnArrows: true }],
  "perfectionist/sort-objects": [
    "error",
    {
      type: "unsorted",
      newlinesBetween: 0
    }
  ],
  "arrow-body-style": ["error", "as-needed"],
  "@stylistic/function-call-argument-newline": ["error", "consistent"],
  "@stylistic/function-paren-newline": ["error", "consistent"],
  "local/expand-nested-object-expression": "error",
  "local/expand-nested-type-literal": "error",
  "local/multiline-arg-paren-newline": "error",
  "local/no-padded-tag": "error",
  "no-nested-ternary": "error",
  "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
  "@typescript-eslint/no-floating-promises": "error"
};

const sharedPlugins = {
  "@stylistic": stylistic,
  import: importPlugin,
  "import-newlines": importNewlines,
  perfectionist,
  local: {
    rules: {
      "expand-nested-object-expression": expandNestedObjectExpression,
      "expand-nested-type-literal": expandNestedTypeLiteral,
      "multiline-arg-paren-newline": multilineArgParenNewline,
      "no-padded-tag": noPaddedTag
    }
  }
};

const sharedGlobals = {
  ...globals.browser,
  ...globals.node
};

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...vuePlugin.configs["flat/recommended"],
  globalIgnores([
    "dist/**",
    "node_modules/**"
  ]),
  {
    files: ["**/*.{ts,mts,js,mjs}"],
    ignores: ["eslint.config.js", "eslint-rules/**"],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },
      globals: sharedGlobals
    },
    plugins: sharedPlugins,
    rules: tsStyleRules
  },
  {
    files: ["eslint.config.js", "eslint-rules/**/*.js"],
    languageOptions: {
      parser: tsEslint.parser,
      globals: sharedGlobals
    },
    plugins: sharedPlugins,
    rules: {
      ...tsStyleRules,
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/prefer-for-of": "off"
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsEslint.parser,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".vue"],
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: sharedGlobals
    },
    plugins: sharedPlugins,
    rules: {
      ...tsStyleRules,
      "vue/html-indent": ["error", 2],
      "vue/script-indent": ["error", 2, { baseIndent: 1 }],
      "vue/multi-word-component-names": "off",
      "vue/attributes-order": "error",
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "vue/html-self-closing": ["error", {
        html: {
          void: "always",
          normal: "always",
          component: "always"
        },
        svg: "always",
        math: "always"
      }],
      "vue/no-v-html": "off",
      "vue/v-on-event-hyphenation": ["error", "always"],
      "@typescript-eslint/no-explicit-any": "off",
      "@stylistic/indent": "off"
    }
  }
];
