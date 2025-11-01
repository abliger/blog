import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Inspector from 'vite-plugin-vue-inspector'
import vueDevTools from 'vite-plugin-vue-devtools'
// import { ThumbnailHashImages } from '@nolebase/vitepress-plugin-thumbnail-hash/vite'
// import {
//     GitChangelog,
//     GitChangelogMarkdownSection,
// } from '@nolebase/vitepress-plugin-git-changelog/vite'

// import config from './config'

export const vite = {
    assetsInclude: ['**/*.html'],
    plugins: [
        viteDemoPreviewPlugin(),
        vueJsx(),
        Inspector(),
        vueDevTools(),
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
    // ssr: {
    //     noExternal: ['@nolebase/vitepress-plugin-highlight-targeted-heading'],
    // },
}
