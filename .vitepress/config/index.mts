import type { DefaultTheme, UserConfig } from 'vitepress'
import { themeConfig } from './themeConfig.mts';
import { markdown } from './markdown.mts';
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { getUrlFile } from '../util/getUrlFile';
import { archiveDir } from './file.mts';
let dir = getUrlFile('./doc/')
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
        let t = pageData.relativePath.split('/')
        let childSider = archiveDir[`/${t.shift()}`] as DefaultTheme.SidebarItem[]
        if (!childSider) {
            return
        }
        console.log(childSider);



        // if (!weakMap.has(new String(t[0]))) {
        //     let filedir = getUrlFile(`./doc/${t[0]}`)
        //     weakMap.set(new String(t[0]), filedir)
        // }
        // let filedir = weakMap.get(new String(t[0]))
        // console.log(filedir)
        pageData.frontmatter = {
            prev: {
                text: "Markdown",
                link: "/java/Swagger/Swagger"
            },
            next: {
                text: "Markdown",
                link: "/java/Swagger/Swagger"
            }
        }
    },
    locales: {
        root: {
            label: 'zh',
            lang: 'zh-CN',
        },
    },
    themeConfig,
    markdown,
    vite: {
        plugins: [viteDemoPreviewPlugin(), vueJsx()],
    },
} as UserConfig<DefaultTheme.Config>
