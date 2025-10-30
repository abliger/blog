// https://vitepress.dev/guide/custom-theme
import type { Theme, EnhanceAppContext } from 'vitepress'
import ThemeDefault from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import './style.css'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import '@vitepress-code-preview/container/dist/style.css'
import Layout from './Layout.vue'
import { createMermaidRenderer } from 'vitepress-mermaid-renderer'
import 'style-vue/style.css'
import { nextTick } from 'vue'
export default {
    extends: ThemeDefault,
    Layout: Layout,
    enhanceApp({ app, router }: EnhanceAppContext) {
        app.use(TwoslashFloatingVue)
        useComponents(app, DemoPreview)
        const mermaidRenderer = createMermaidRenderer({
            theme: 'dark', // 'default', 'dark', 'forest', 'neutral'
            startOnLoad: false,
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
            },
            sequence: {
                diagramMarginX: 50,
                diagramMarginY: 10,
            },
        })
        mermaidRenderer.initialize()

        if (router) {
            router.onAfterRouteChange = () => {
                nextTick(() => mermaidRenderer.renderMermaidDiagrams())
            }
        }
    },
} satisfies Theme
