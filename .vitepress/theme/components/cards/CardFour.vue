<template>
    <div class="card4">
        <!-- 使用 svg -->
        <p>鲁东大学</p>
        <mark-img src="/ludong.jpg" v-show="endAnim" />
        <p>上海</p>
        <div><img src="/allPeople.jpeg" alt="allPeople" /></div>
    </div>
</template>
<script setup lang="tsx">
    import { inject } from 'vue';
    import { MarkImg } from "style-vue"
    const endAnim = inject('endAnim')
</script>