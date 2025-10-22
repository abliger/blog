<!-- 
    IconScroll 图标滚动组件
    接收一个图标数组 icons，图表默认分成两行,无限滚动显示
-->
<template>
    <div class="IconScroll">
        <div class="cell">
            <div class="line">
                <div class="icon-item" v-for="(icon, index) in props.icons" :key="index">
                    <img :src="icon.imgSrc" :alt="icon.name" />
                </div>
            </div>
            <div class="line">
                <div class="icon-item" v-for="(icon, index) in props.icons" :key="'dup-' + index">
                    <img :src="icon.imgSrc" :alt="icon.name" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="tsx">
    import { computed } from 'vue';

    const props = defineProps<{
        icons: { name: string, imgSrc: string }[];
    }>()
</script>
<style lang="css">
    .IconScroll {
        width: 100%;
        /* overflow: hidden; */
        position: relative;
        align-items: center;
        flex-direction: column;
        padding: 20px 0;
        display: flex;
        user-select: none;
        -webkit-user-select: none;

    }

    .line {
        display: flex;
        width: max-content;
        translate: none;
        rotate: none;
        scale: none;
        align-items: center;
        animation: iconScroll 10s infinite;
    }

    img {
        pointer-events: none;

    }

    @keyframes iconScroll {
        0% {
            transform: translate3D(0%, 0px, 0px);
        }

        50% {
            transform: translate3D(50%, 0px, 0px);
        }

        100% {
            transform: translate3D(-50%, 0px, 0px);
        }
    }
</style>