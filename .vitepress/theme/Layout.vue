<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
const { Layout } = DefaultTheme
import './css/iframe.css'
const { path } = useRoute()
import { useToggleTheme } from './animation/themeDark/trans'
import { useFadeInByRoute } from './animation/VPDoc/docFadeIn'
import FcIndex from './components/FcIndex.vue'
useFadeInByRoute('VPDoc')
useToggleTheme()

// 正确方式（使用 useRoute）

</script>

<template>
  <template v-if="path === '/' || path === '/index'">
    <fc-index>
      <!-- <template #loading>
        <div class="loading" ref="loading">
          loading...
        </div>
      </template> -->
    </fc-index>
  </template>
  <template v-else-if="path === '/about'">

  </template>
  <template v-else>
    <Layout>

      <!-- <template #doc-before>
        {{ pageName }}
      </template> -->

    </Layout>
  </template>



</template>

<style></style>