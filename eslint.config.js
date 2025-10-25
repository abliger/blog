export default {
  env: {
    browser: true,
    es2021: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "standard",
    "plugin:vue/base",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-strongly-recommended",
  ],
  ignorePatterns: ["node_modules", "dist", "*.d.ts"],
  // parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeature: {
      jsx: true,
      tsx: true,
    },
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "vue/multi-word-component-names": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-absolute-path": "off",
    "import/no-extraneous-dependencies": "off",
    "no-empty-pattern": "off", // 进制空结构
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": ["error", "only-multiline"], // 要求或禁止末尾逗号
    "comma-style": ["error", "last"], // 强制使用一致的逗号风格
    "func-call-spacing": ["error", "never"], // 要求或禁止在函数标识符和其调用之间有空格
    indent: ["error", 2], // 缩进 2字符
    "no-mixed-operators": "error", // 禁止混合使用不同的操作符
    "no-mixed-spaces-and-tabs": "error", // 禁止空格和 tab 的混合缩进
    "semi-style": ["error", "last"], // 强制分号的位置
    quotes: ["error", "single"], // 单引号
    semi: ["error", "never"], // 进制末尾分号
    "padded-blocks": ["error", "never"], // 要求或禁止块内填充
    "space-before-function-paren": ["error", "never"], // 强制在 function的左括号之前使用一致的空格
    "no-extend-native": "off", // 禁止扩展原生类型
    eqeqeq: ["error", "smart"], // 要求使用 === 和 !==
    "prefer-promise-reject-errors": "off", // 要求使用 Error 对象作为 Promise 拒绝的原因
    "no-tabs": ["error", { allowIndentationTabs: true }], // 禁用 tab
    "vue/attribute-hyphenation": ["error", "always"],
    "vue/no-mutating-props": "off",
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "vue/html-closing-bracket-spacing": [
      "error",
      {
        startTag: "never",
        endTag: "never",
        selfClosingTag: "always",
      },
    ],
    "vue/html-indent": [
      "error",
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    "vue/html-quotes": ["error", "double"],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 6,
        multiline: 6,
      },
    ],
    "vue/multiline-html-element-content-newline": [
      "error",
      {
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea"],
      },
    ],
    "vue/no-parsing-error": "off",
  },
};
