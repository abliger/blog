import { type DefaultTheme, type UserConfig } from 'vitepress'
import themeConfig from './themeConfig'
import { markdown } from './markdown'
import { vite } from './vite'
// import config from './config'
console.log(process.env)

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
        // template: {
        //     transformAssetUrls: {
        //         NolebaseUnlazyImg: ['src'],
        //     },
        // },
    },
} as UserConfig<DefaultTheme.Config>
