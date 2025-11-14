import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Inspector from 'vite-plugin-vue-inspector'
import vueDevTools from 'vite-plugin-vue-devtools'
import glsl from 'vite-plugin-glsl'
// import { ThumbnailHashImages } from '@nolebase/vitepress-plugin-thumbnail-hash/vite'
// import {
//     GitChangelog,
//     GitChangelogMarkdownSection,
// } from '@nolebase/vitepress-plugin-git-changelog/vite'

import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss'
import { visualizer } from 'rollup-plugin-visualizer' // 导入插件
import config from './env/config'
const RSS: RSSOptions = {
    title: "Abliger's blog",
    baseUrl: config.baseUrl,
    copyright: 'Copyright (c) 2018-present, Abliger',
}

export const vite = {
    assetsInclude: ['**/*.html'],
    plugins: [
        viteDemoPreviewPlugin(),
        vueJsx(),
        Inspector(),
        vueDevTools(),
        RssPlugin(RSS),
        glsl(),
        // ThumbnailHashImages(),

        // GitChangelog({
        //     // Fill in your repository URL here
        //     repoURL: () => 'https://github.com/abliger/blog',
        // }),
        // GitChangelogMarkdownSection({
        //     sections: {
        //         disableContributors: true,
        //     },
        // }),
    ],
    // build: {
    //     sourcemap: true,
    // },
    build: {
        rollupOptions: {
            plugins: [
                // 添加可视化插件（构建后生成报告）
                visualizer({
                    filename: './chunk-analyze.html', // 报告文件路径（项目根目录）
                    open: true, // 构建完成后自动打开报告（可选）
                    gzipSize: true, // 显示 gzip 压缩后的体积（关键，与警告阈值一致）
                    brotliSize: false, // 可选，显示 brotli 压缩体积
                }),
            ],
        },
    },
    // ssr: {
    //     noExternal: ['@nolebase/vitepress-plugin-highlight-targeted-heading'],
    // },
}
