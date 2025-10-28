import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { configs } from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import vueParser from 'vue-eslint-parser'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

const isDev = process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export default defineConfig([
    globalIgnores(
        [
            'node_modules/**',
            '**/dist/**',
            'doc/**',
            'project/**',
            'game/**',
            '**/coverage/**',
            '**/build/**',
            '**/temp/**',
            '**/tmp/**',
            '**/cache/**',
        ],
        'Ignore Build Directory',
    ),
    js.configs.recommended,
    configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        settings: {
            'import/resolver': {
                node: {
                    paths: ['node_modules'],
                    extensions: ['.js', '.ts', '.vue'],
                },
                // If using TypeScript
                typescript: {
                    project: '.vitepress/tsconfig.json',
                },
            },
        },
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
        },
    },
    {
        extends: [
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
        ],
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        rules: {
            semi: ['error', 'never'],
            'import/no-unresolved': 'off',
            'import/extensions': 'off',
            'import/no-absolute-path': 'off',
            'import/no-extraneous-dependencies': 'off',
            'no-empty-pattern': 'off', // 进制空结构
            'no-console': !isDev ? 'error' : 'off',
            'no-debugger': !isDev ? 'error' : 'off',
            'comma-dangle': ['error', 'only-multiline'], // 要求或禁止末尾逗号
            'comma-style': ['error', 'last'], // 强制使用一致的逗号风格
            'func-call-spacing': ['error', 'never'], // 要求或禁止在函数标识符和其调用之间有空格
            indent: ['error', 4], // 缩进 2字符
            'no-mixed-spaces-and-tabs': 'error', // 禁止空格和 tab 的混合缩进
            'semi-style': ['error', 'last'], // 强制分号的位置
            quotes: ['error', 'single'], // 单引号
            'padded-blocks': ['error', 'never'], // 要求或禁止块内填充
            'space-before-function-paren': ['error', 'never'], // 强制在 function的左括号之前使用一致的空格
            'no-extend-native': 'off', // 禁止扩展原生类型
            eqeqeq: ['error', 'smart'], // 要求使用 === 和 !==
            'prefer-promise-reject-errors': 'off', // 要求使用 Error 对象作为 Promise 拒绝的原因
            'no-tabs': ['error', { allowIndentationTabs: true }], // 禁用 tab

            // ts
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            sourceType: 'module',
            ecmaVersion: 2022,
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },
        rules: {
            'vue/no-unused-vars': [
                'error',
                {
                    ignorePattern: '^_',
                },
            ], // 没有未使用的变量
            'vue/multi-word-component-names': [
                'warn',
                {
                    ignores: ['Layout', 'Loading'],
                },
            ], // 多单词名字
            'vue/no-async-in-computed-properties': [
                'error',
                {
                    ignoredObjectNames: [],
                },
            ], //防止在计算属性和函数中调用异步方法
            'vue/no-duplicate-attributes': [
                'error',
                {
                    allowCoexistClass: true,
                    allowCoexistStyle: true,
                },
            ], // 报告重复的属性 , 允许  v-bind 的 class 和 style 属性重复
            'vue/no-mutating-props': 'off', // 不允许组件 props 对象变化
            'vue/no-parsing-error': [
                'error',
                {
                    'abrupt-closing-of-empty-comment': true,
                    'absence-of-digits-in-numeric-character-reference': true,
                    'cdata-in-html-content': true,
                    'character-reference-outside-unicode-range': true,
                    'control-character-in-input-stream': true,
                    'control-character-reference': true,
                    'eof-before-tag-name': true,
                    'eof-in-cdata': true,
                    'eof-in-comment': true,
                    'eof-in-tag': true,
                    'incorrectly-closed-comment': true,
                    'incorrectly-opened-comment': true,
                    'invalid-first-character-of-tag-name': true,
                    'missing-attribute-value': true,
                    'missing-end-tag-name': true,
                    'missing-semicolon-after-character-reference': true,
                    'missing-whitespace-between-attributes': true,
                    'nested-comment': true,
                    'noncharacter-character-reference': true,
                    'noncharacter-in-input-stream': true,
                    'null-character-reference': true,
                    'surrogate-character-reference': true,
                    'surrogate-in-input-stream': true,
                    'unexpected-character-in-attribute-name': true,
                    'unexpected-character-in-unquoted-attribute-value': true,
                    'unexpected-equals-sign-before-attribute-name': true,
                    'unexpected-null-character': true,
                    'unexpected-question-mark-instead-of-tag-name': true,
                    'unexpected-solidus-in-tag': true,
                    'unknown-named-character-reference': true,
                    'end-tag-with-attributes': true,
                    'duplicate-attribute': true,
                    'end-tag-with-trailing-solidus': true,
                    'non-void-html-element-start-tag-with-trailing-solidus': false,
                    'x-invalid-end-tag': true,
                    'x-invalid-namespace': true,
                },
            ], //不允许在 <template> 中解析错误
            'vue/attribute-hyphenation': [
                'error',
                'always',
                {
                    ignore: [],
                    ignoreTags: [],
                },
            ], //强制在 Vue 模板中的自定义组件上使用连字符的属性名称
            'vue/no-unused-components': [
                'error',
                {
                    ignoreWhenBindingPresent: false,
                },
            ], //报告模板中未使用的组件
            'vue/component-definition-name-casing': ['error', 'PascalCase'], // "kebab-case" vue 模版名字风格
            'vue/html-closing-bracket-newline': [
                'error',
                {
                    singleline: 'never',
                    multiline: 'always',
                    selfClosingTag: {
                        singleline: 'never',
                        multiline: 'always',
                    },
                },
            ], //要求或不允许在标签的右括号之前换行
            'vue/html-closing-bracket-spacing': [
                'error',
                {
                    startTag: 'never',
                    endTag: 'never',
                    selfClosingTag: 'always',
                },
            ], // 此规则旨在在标记的 > 中关闭括号之前强制执行一致的间距样式
            'vue/html-indent': [
                'error',
                4,
                {
                    attribute: 1,
                    baseIndent: 1,
                    closeBracket: 0,
                    alignAttributesVertically: true,
                    ignores: [],
                },
            ],
            'vue/html-quotes': ['error', 'double'], //强制 HTML 属性的引号样式
            'vue/max-attributes-per-line': [
                'error',
                {
                    singleline: {
                        max: 5,
                    },
                    multiline: {
                        max: 2,
                    },
                },
            ], //强制执行每行的最大属性数
            'vue/multiline-html-element-content-newline': [
                'error',
                {
                    ignoreWhenEmpty: true,
                    ignores: ['pre', 'textarea'],
                    allowEmptyLines: false,
                },
            ], //在多行元素的内容之前和之后强制执行换行符
            'vue/no-multi-spaces': [
                'error',
                {
                    ignoreProperties: true, //是否应该忽略对象的属性
                },
            ], // 删除标签中不用于缩进的多个空格
        },
    },
    eslintConfigPrettier,
])
