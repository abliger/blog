<template>
    <div class="card">
        <div class="left">
            <div class="info">
                <p>你好,我是</p>
                <h1>Abliger</h1>
                <fc-typing :strs>
                    <span>一名 </span>
                </fc-typing>
                <p>热爱编程，喜欢折腾新技术</p>
                <p>我在这个网站记录我的成长,记录代码和生活</p>
            </div>
            <ul class="link">
                <li>
                    <a href="https://github.com/abliger" target="_blank">
                        <github />
                    </a>
                </li>
                <li>
                    <a href="https://space.bilibili.com/16062076" target="_blank">
                        <bilibili />
                    </a>
                </li>
                <li>
                    <a href="https://163cn.tv/Mj09MfT" target="_blank">
                        <neteasecloudmusic />
                    </a>
                </li>
                <li>
                    <a href="mailto:abliger@icloud.com">
                        <maildotru />
                    </a>
                </li>
                <li>
                    <a href="javascript: void(0)">
                        <rss />
                    </a>
                </li>
            </ul>
        </div>
        <div class="right">
            <particle-img imgSrc="image.png" v-show="startAnim" />
        </div>
    </div>
</template>
<script lang="tsx" setup>
    import { inject } from "vue";
    import { FcTyping, ParticleImg } from "style-vue";
    import github from "./icons/github.vue";
    import bilibili from "./icons/bilibili.vue";
    import maildotru from "./icons/maildotru.vue";
    import neteasecloudmusic from "./icons/neteasecloudmusic.vue";
    import rss from "./icons/rss.vue";
    const startAnim = inject('startAnim')
    defineProps<{
        strs: string[]
    }>()

</script>
<style lang="css" scoped>
    .card {
        display: flex;
        width: 100%;
        height: 100vh;
        align-items: center;
        justify-content: space-around;
    }

    .left {
        h1 {
            margin: 20px 10px;
            font-size: 40px;
            text-align: center;
            color: aqua;
        }

        p {
            font-weight: bold;
            font-style: oblique;
        }

        .link {

            display: flex;
            gap: 20px;
            margin-top: 7rem;

            li {
                border-radius: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            svg {
                width: 35px;
                height: 35px;
            }

            svg:deep(path) {
                fill: white;
            }
        }
    }

</style>