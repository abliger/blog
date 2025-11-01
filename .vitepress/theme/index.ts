import { Theme, EnhanceAppContext } from 'vitepress'
import ThemeDefault from 'vitepress/theme'
import Layout from './Layout.vue'
import 'style-vue/style.css'
import './style.css'
import '@shikijs/vitepress-twoslash/style.css'
// import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'

// import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
// import '@vitepress-code-preview/container/dist/style.css'

// import { createMermaidRenderer } from 'vitepress-mermaid-renderer'

// import { nextTick } from 'vue'

// import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
// import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

export default {
    extends: ThemeDefault,
    Layout,
    enhanceApp({}: EnhanceAppContext) {
        // app.use(TwoslashFloatingVue).use(NolebaseGitChangelogPlugin)
        // useComponents(app, DemoPreview)
        // const mermaidRenderer = createMermaidRenderer({
        //     theme: 'dark', // 'default', 'dark', 'forest', 'neutral'
        //     startOnLoad: false,
        //     flowchart: {
        //         useMaxWidth: true,
        //         htmlLabels: true,
        //     },
        //     sequence: {
        //         diagramMarginX: 50,
        //         diagramMarginY: 10,
        //     },
        // })
        // mermaidRenderer.initialize()
        // router.onAfterRouteChange = () => {
        //     nextTick(() => mermaidRenderer.renderMermaidDiagrams())
        // }
    },
} satisfies Theme
