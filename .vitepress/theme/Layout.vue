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
    // import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
    // import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'
    import GridBackground from './components/styleComponents/GridBackground.vue'
    import CommentGiscus from './components/styleComponents/CommentGiscus.vue'
</script>

<template>
    <GridBackground>
        <template v-if="path === '/about'">
            <fc-index />
        </template>
        <template v-else-if="path === '/tag'"> </template>
        <template v-else>
            <Layout>
                <!-- <template #not-found> </template> -->
                <!-- <template #aside-top>
                    <div>你的侧边栏内容</div>
                </template> -->
                <!-- <template #layout-top>
                    <NolebaseHighlightTargetedHeading />
                </template> -->
                <template #doc-bottom>
                    <CommentGiscus />
                </template>
            </Layout>
        </template>
        <!-- <template v-else>
            <Content />
        </template> -->
    </GridBackground>
</template>
<!-- <style lang="css">
    .VPSidebar {
        display: none;
    }
</style> -->
