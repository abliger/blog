<script setup>
    import ThemeDefault from 'vitepress/theme'
    import { useRoute } from 'vitepress'
    let { Layout } = ThemeDefault
    import './css/iframe.css'
    const { path } = useRoute()
    import { useToggleTheme } from './animation/themeDark/trans'
    import { useFadeInByRoute } from './animation/VPDoc/docFadeIn'
    import FcIndex from './components/about/FcIndex.vue'
    useFadeInByRoute('VPDoc')
    useToggleTheme()
    import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
    import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'
    import GridBackground from './components/styleComponents/GridBackground.vue'
</script>

<template>
    <GridBackground>
        <template v-if="path === '/about'">
            <fc-index />
        </template>
        <template v-else>
            <Layout>
                <template #layout-top>
                    <NolebaseHighlightTargetedHeading />
                </template>
            </Layout>
        </template>
    </GridBackground>
</template>
