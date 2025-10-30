import { type DefaultTheme, type UserConfig } from 'vitepress'
import themeConfig from './themeConfig'
import { markdown } from './markdown'
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'
import { getFileURLToNextOrPrev } from './file'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Inspector from 'vite-plugin-vue-inspector'
import vueDevTools from 'vite-plugin-vue-devtools'
const vite = {
    assetsInclude: ['**/*.html'],
    plugins: [viteDemoPreviewPlugin(), vueJsx(), Inspector(), vueDevTools()],
    build: {
        sourcemap: true,
    },
}

export default {
    title: 'Blog',
    description: "Abliger's Blog",
    srcDir: 'doc',
    srcExclude: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.vitepress/**',
        '**/.DS_Store',
        '**/project/**',
    ],
    metaChunk: true,
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: true,
    transformPageData(pageData) {
        const path = pageData.relativePath
        pageData.frontmatter = Object.assign(
            {},
            pageData.frontmatter,
            getFileURLToNextOrPrev(path),
        )
    },
    locales: {
        root: {
            label: 'zh',
            lang: 'zh-CN',
        },
    },
    themeConfig,
    markdown,
    vite,
} as UserConfig<DefaultTheme.Config>
