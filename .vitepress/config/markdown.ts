// import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
// import { demoPreviewPlugin } from '@vitepress-code-preview/plugin'
// import { fileURLToPath, URL } from 'node:url'
import { MarkdownOptions } from 'vitepress'
// import { UnlazyImages } from '@nolebase/markdown-it-unlazy-img'
// import mathjax3 from 'markdown-it-mathjax3'
// import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'

export const markdown = {
    // codeTransformers: [transformerTwoslash()],
    toc: { level: [1, 2, 3, 4, 5] },
    math: true,
    config(_) {
        // const docRoot = fileURLToPath(new URL('../../doc', import.meta.url))
        // md.use(mathjax3)
        // .use(demoPreviewPlugin, { docRoot })
        // .use(UnlazyImages(), {
        //     imgElementTag: 'NolebaseUnlazyImg',
        // })
        // .use(BiDirectionalLinks())
    },
    // image: {
    //     // image lazy loading is disabled by default
    //     lazyLoading: true,
    // },
} as MarkdownOptions
