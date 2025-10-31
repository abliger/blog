import { type DefaultTheme, type UserConfig } from 'vitepress'
import themeConfig from './themeConfig'
import { markdown } from './markdown'
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Inspector from 'vite-plugin-vue-inspector'
import vueDevTools from 'vite-plugin-vue-devtools'
import { ThumbnailHashImages } from '@nolebase/vitepress-plugin-thumbnail-hash/vite'
import {
    GitChangelog,
    GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
const vite = {
    assetsInclude: ['**/*.html'],
    plugins: [
        viteDemoPreviewPlugin(),
        vueJsx(),
        Inspector(),
        vueDevTools(),
        ThumbnailHashImages(),

        GitChangelog({
            // Fill in your repository URL here
            repoURL: () => 'https://github.com/abliger/blog',
        }),
        GitChangelogMarkdownSection({
            sections: {
                disableContributors: true,
            },
        }),
    ],
    build: {
        sourcemap: true,
    },
    ssr: {
        noExternal: ['@nolebase/vitepress-plugin-highlight-targeted-heading'],
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
    locales: {
        root: {
            label: 'zh',
            lang: 'zh-CN',
        },
    },
    themeConfig,
    markdown,
    vite,
    vue: {
        template: {
            transformAssetUrls: {
                NolebaseUnlazyImg: ['src'],
            },
        },
    },
} as UserConfig<DefaultTheme.Config>
