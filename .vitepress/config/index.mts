import type { DefaultTheme, UserConfig } from 'vitepress'
import { themeConfig } from './themeConfig.mts';
import { markdown } from './markdown.mts';
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { dir, getFileNameByNextOrPrev } from './file.mts';
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

        // 寻找 dir 中的 path 对应的 index
        const index = dir.findIndex(item => item === path);
        if (index == 0) {
            pageData.frontmatter = {
                next: {
                    text: getFileNameByNextOrPrev(dir[index + 1]),
                    link: dir[index + 1]
                }
            }
        } else if (index === dir.length - 1) {
            console.log(getFileNameByNextOrPrev(dir[index]));

            pageData.frontmatter = {
                prev: {
                    text: getFileNameByNextOrPrev(dir[index - 1]),
                    link: dir[index - 1]
                },
            }
        } else {
            pageData.frontmatter = {
                next: {
                    text: getFileNameByNextOrPrev(dir[index + 1]),
                    link: dir[index + 1]
                },
                prev: {
                    text: getFileNameByNextOrPrev(dir[index - 1]),
                    link: dir[index - 1]
                },
            }
        }


        // if (!weakMap.has(new String(t[0]))) {
        //     let filedir = getUrlFile(`./doc/${t[0]}`)
        //     weakMap.set(new String(t[0]), filedir)
        // }
        // let filedir = weakMap.get(new String(t[0]))
        // console.log(filedir)

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
