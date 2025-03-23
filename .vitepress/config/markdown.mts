import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { demoPreviewPlugin } from '@vitepress-code-preview/plugin'
import { fileURLToPath, URL } from 'node:url'
import { MarkdownOptions } from 'vitepress'

export const markdown = {
    codeTransformers: [
        transformerTwoslash()
    ],
    toc: { level: [1, 2, 3, 4, 5] },
    math: true,
    config(md) {
        const docRoot = fileURLToPath(new URL('../', import.meta.url))
        md.use(demoPreviewPlugin, { docRoot })
    }
} as MarkdownOptions