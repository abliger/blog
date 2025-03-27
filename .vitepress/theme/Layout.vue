<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData,useRoute } from 'vitepress'
const { Layout } = DefaultTheme
import './css/iframe.css'
const  {path} = useRoute()
import {useTest} from './theme_dark/trans'
useTest()
</script>

<template>
    <template v-if="path === '/'">
      {{ path }}
    </template> 
    <template v-else-if="path === '/about'">

    </template>
    <template v-else>
      <Layout>
      
      <!-- <template #aside-outline-before>
        My custom sidebar top content
      </template> -->
      
      </Layout>
    </template>



</template>

<style>

</style>