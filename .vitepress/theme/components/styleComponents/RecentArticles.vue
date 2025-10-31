<template>
    <div v-for="(v, k) in template" :key="k" class="recentArt">
        <div class="title">{{ k }}</div>
        <div class="content">
            <div v-for="(c, i) in v.slice(0, 5)" :key="i" class="line">
                <div class="inline">
                    <a :href="getHref(c.path)" target="_self">{{
                        getTitle(c.path)
                    }}</a>
                </div>
                <div>{{ c.ctime.split(' ')[0] }}</div>
            </div>
        </div>
        <br />
    </div>
</template>
<script setup lang="tsx">
    import { useData } from 'vitepress'

    const { theme } = useData()
    type info = {
        path: string
        ctime: string
        mtime: string
    }

    const fileinfo = theme.value.fileInfo as { daily: info[]; other: info[] }
    const template = {
        最近的文稿: fileinfo.other,
        最近的手记: fileinfo.daily,
    }

    const getTitle = (title: string) => {
        return title.split('/').pop().split('.').shift()
    }
    const getHref = (path: string) => {
        return path.split('doc').pop().split('.').shift()
    }
</script>
<style lang="css" scoped>
    .recentArt {
        height: 240px;
    }
    .title {
        height: 40px;
    }
    .content {
        height: 160px;
    }
    .line {
        display: flex;
        flex-direction: row;
        width: 600px;
        justify-content: space-between;
        padding: 0 30px;
        position: relative;
    }
    .inline {
        margin-top: 7px;
        display: flex;
        left: 6px;
    }
    .inline::after {
        content: '';
        position: absolute;
        position: absolute;
        height: 100%;
        width: 2px;
        left: 12px;
        background-color: #fff;
    }
    .line:last-child > .inline::after {
        bottom: 50%;
    }
    .line:first-child > .inline::after {
        top: 50%;
    }
    .inline::before {
        content: '';
        position: absolute;
        height: 6px;
        width: 6px;
        background-color: #fff;
        border-radius: 100%;
        align-self: center;
        left: 10px;
    }
</style>
