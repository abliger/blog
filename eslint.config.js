import { defineConfig,globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import {configs} from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import vueParser from 'vue-eslint-parser'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig([
    globalIgnores([
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
    ],'Ignore Build Directory'),
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
        languageOptions:{
            parser:vueParser,
            sourceType: 'module',
            ecmaVersion: 2022,
            globals: {
                ...globals.browser
            },
            parserOptions: {
                'parser': '@typescript-eslint/parser',
                ecmaVersion: 2022,
                sourceType: 'module'
            },
        },
        rules: {
            'vue/no-unused-vars': ['error'],
            'vue/multi-word-component-names': 'warn',
            'vue/attribute-hyphenation': ['error', 'always'],
            'vue/no-mutating-props': 'off',
            'vue/html-closing-bracket-newline': [
                'error',
                {
                    singleline: 'never',
                    multiline: 'always',
                },
            ],
            'vue/html-closing-bracket-spacing': [
                'error',
                {
                    startTag: 'never',
                    endTag: 'never',
                    selfClosingTag: 'always',
                },
            ],
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
            'vue/html-quotes': ['error', 'double'],
            'vue/max-attributes-per-line': [
                'error',
                {
                    singleline: 6,
                    multiline: 6,
                },
            ],
            'vue/multiline-html-element-content-newline': [
                'error',
                {
                    ignoreWhenEmpty: true,
                    ignores: ['pre', 'textarea'],
                },
            ],
            'vue/no-parsing-error': 'off',
        },
    },
])
