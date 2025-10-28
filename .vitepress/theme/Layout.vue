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
</script>

<template>
    <template v-if="path === '/about'">
        <fc-index />
    </template>
    <template v-else>
        <Layout>
            <!-- <template #doc-before>
        {{ path }}
      </template> -->
        </Layout>
    </template>
</template>
