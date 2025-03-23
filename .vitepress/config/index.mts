import type { DefaultTheme, UserConfig } from 'vitepress'
import { themeConfig } from './themeConfig.mts';
import { markdown } from './markdown.mts';
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { getFileURLToNextOrPrev } from './file.mts';

let vite = {
    assetsInclude: '**/*.html',
    plugins: [viteDemoPreviewPlugin(), vueJsx()],
}

export default {
    title: "Blog",
    description: "Abliger's Blog",
    srcDir: 'doc',
    srcExclude: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.vitepress/**',
        '**/.DS_Store',
        '**/project/**'
    ],
    metaChunk: true,
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: true,
    transformPageData(pageData, ctx) {
        let path = pageData.relativePath
        pageData.frontmatter = Object.assign({}, pageData.frontmatter, getFileURLToNextOrPrev(path))
    },
    locales: {
        root: {
            label: 'zh',
            lang: 'zh-CN',
        },
    },
    themeConfig,
    markdown,
    vite
} as UserConfig<DefaultTheme.Config>
