<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute, useRouter } from 'vitepress'
const { Layout } = DefaultTheme
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
    <fc-index>
    </fc-index>
  </template>
  <template v-else>
    <Layout>

      <!-- <template #doc-before>
        {{ path }}
      </template> -->
    </Layout>
  </template>
</template>