<template>
    <div class="zhuifan">
        <div v-for="(k, i) in list" :key="i" class="content">
            <div class="info">
                <h3 class="title">{{ k.title }}</h3>
                <div class="tag">
                    <span v-for="(v, a) in k.styles" :key="a">
                        {{ v }}
                        <span v-if="a !== k.styles.length - 1">|</span>
                    </span>
                </div>
                <div>
                    {{ k.areas[0].name }}
                    |
                    {{ parseDate(k.publish.pub_time) }}
                </div>
                <div>
                    {{ k.new_ep.index_show }}
                    <span v-if="k.progress">|{{ k.progress }}</span>
                </div>
                <div class="summary">{{ k.summary }}</div>
            </div>
            <div class="img">
                <img
                    :src="k.cover"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    crossorigin="anonymous"
                />
            </div>
        </div>
    </div>
</template>
<script lang="tsx" setup>
    import { useData } from 'vitepress'
    import { List } from '../../../types/fan'
    const list: List[] = useData().theme.value.zhuifan

    function parseDate(data: string) {
        const [y, m, d] = data.split(' ')[0].split('-')
        return `${y}年${m}月${d}日`
    }
</script>
<style lang="css" scoped>
    .zhuifan {
        column-count: 2;
        column-gap: 30px;
        padding-top: 30px;
    }
    .content {
        display: flex;
        flex-direction: row-reverse;
        justify-content: start;
        gap: 10px;
        padding-bottom: 20px;
    }
    .img {
        width: 154px;
        height: 205px;
        flex-shrink: 0;
    }
    .info {
        height: 205px;
        overflow: hidden;
    }
    .title {
        font-weight: 800;
        font-size: larger;
    }
    .summary {
        margin-top: 12px;
        margin-bottom: 12px;
        font-size: 14px;
        line-height: 20px;
        display: -webkit-box;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }
    .tag {
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 15px;
        font-size: 14px;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>
