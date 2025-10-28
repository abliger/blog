// https://vitepress.dev/guide/custom-theme
import type { Theme, EnhanceAppContext } from 'vitepress'
import ThemeDefault from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import './style.css'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import '@vitepress-code-preview/container/dist/style.css'
import Layout from './Layout.vue'

import 'style-vue/style.css'

export default {
    extends: ThemeDefault,
    Layout: Layout,
    enhanceApp({ app }: EnhanceAppContext) {
        app.use(TwoslashFloatingVue)
        useComponents(app, DemoPreview)
    },
} satisfies Theme
