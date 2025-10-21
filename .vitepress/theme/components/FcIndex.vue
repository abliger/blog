<template>
    <div id="BIndex">
        <slot>
            <div class="card1">
                <div class="left">
                    <p>你好,我是</p>
                    <h2>风晨</h2>
                    <fc-typing :strs="MYTAG">
                        <span>一名 </span>
                    </fc-typing>
                    <p>热爱编程，喜欢折腾新技术</p>
                    <p>我在这个网站记录我的成长,记录代码和生活</p>
                </div>
                <div class="right">
                    <img src="/avatar.png" alt="Logo" style="width: 200px; height: 200px;" />
                </div>


            </div>
        </slot>
        <slot name="loading">
            <div class="loading" ref="loading">
                loading...
            </div>
        </slot>
    </div>
</template>
<script setup lang="tsx">
import { onBeforeMount, onMounted, ref, useTemplateRef, nextTick } from "vue";
import FcTyping from "./styleComponents/FcTyping.vue";
let MYTAG = ["喜欢折腾新技术的前端人", "热爱编程的码农", "热爱生活的普通人", "未来的小说家", "业余摄影师", "电影爱好者", "音乐发烧友"];

let loading = useTemplateRef('loading')

onBeforeMount(() => {
    console.log("onBeforeMount");
});

onMounted(() => {
    /// 页面加载完成后，执行淡出动画
    /// 使用 nextTick 和 requestAnimationFrame 确保首次渲染后执行
    nextTick(() => {
        requestAnimationFrame(() => {
            if (loading.value) {
                loading.value.classList.add('loading_hidden');
            }
        });
    });
});
</script>
<style lang="css" scoped>
#BIndex {
    position: relative;
}

.left {
    h1 {
        font-size: large;
        color: red;
    }
}

.loading {
    background-color: red;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    transition: opacity 1s ease-in-out;
}

.loading_hidden {
    opacity: 0;
}
</style>