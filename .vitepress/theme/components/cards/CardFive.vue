<template>
    <div class="card5">
        <div class="left">
            <recent-articles />
        </div>
        <div class="right">
            <div>steam</div>
            <div>图书</div>
            <div>追番</div>
            <div>音乐</div>
        </div>
    </div>
</template>
<script setup lang="tsx">
    import { onMounted } from 'vue'
    import RecentArticles from '../styleComponents/RecentArticles.vue'

    onMounted(() => {})
</script>
<style lang="css" scoped></style>
