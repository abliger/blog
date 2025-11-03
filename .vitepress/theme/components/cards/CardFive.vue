<template>
    <div class="card5">
        <div class="left">
            <recent-articles />
        </div>
        <div class="right">
            <AdminInfo></AdminInfo>
        </div>
    </div>
</template>
<script setup lang="tsx">
    import { onMounted } from 'vue'
    import RecentArticles from '../styleComponents/RecentArticles.vue'
    import AdminInfo from './other/AdminInfo.vue'
    onMounted(() => {})
</script>
<style lang="css" scoped>
    .card5 {
        display: flex;
        justify-content: space-around;
    }
    .right {
        transform: translateY(70px);
        /* todo 如何 AdminInfo 添加信息,这里要注释掉 */
    }
</style>
