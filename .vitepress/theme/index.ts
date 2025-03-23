// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import type { EnhanceAppContext } from 'vitepress'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import '@vitepress-code-preview/container/dist/style.css'
export default {
  extends: DefaultTheme,
  Layout: DefaultTheme.Layout,
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)
    useComponents(app, DemoPreview)
  }
} satisfies Theme
