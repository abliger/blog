import { type DefaultTheme, type UserConfig } from 'vitepress'
import themeConfig from './themeConfig'
import { markdown } from './markdown'
import { vite } from './vite'

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
    sitemap: {
        hostname: 'http://localhost:5173/',
        lastmodDateOnly: false,
    },
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
        // template: {
        //     transformAssetUrls: {
        //         NolebaseUnlazyImg: ['src'],
        //     },
        // },
    },
} as UserConfig<DefaultTheme.Config>
