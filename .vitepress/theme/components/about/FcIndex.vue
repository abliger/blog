<template>
    <div id="BIndex">
        <slot>
            <div class="card1">
                <div class="left">
                    <p>你好,我是</p>
                    <h1>风晨</h1>
                    <fc-typing :strs="myTag">
                        <span>一名 </span>
                    </fc-typing>
                    <p>热爱编程，喜欢折腾新技术</p>
                    <p>我在这个网站记录我的成长,记录代码和生活</p>
                </div>
                <div class="right">
                    <partocle-img imgSrc="image.png" v-show="startAnim" />
                </div>
            </div>
            <div class="card2">
                <icon-scroll :icons="data.mylearnedSkill" />
            </div>
            <div class="card3">
                <!-- <Content path="about" /> -->
                <div class="project-before">
                    <div>新语言</div>
                    <div>TaskTodo</div>
                    <div>pixiv_download</div>
                </div>
                <div class="skill">
                    <div>JavaScript/TypeScript</div>
                    <div>Vue</div>
                    <div>C#</div>
                    <div>Rust</div>
                    <div>Swift</div>
                    <div>Java</div>
                    <div>SpringBoot</div>
                    <div>Data Structure/Compiling Principles</div>
                    <div>Skills</div>
                    <div>three.js</div>
                </div>
                <div class="project-after">
                    <div>blog</div>
                </div>
                <div class="other-skills">
                    <div>vitepress</div>
                    <div>skills-icons</div>
                </div>
            </div>
            <div class="card4">
                <!-- 使用 svg -->
                <p>鲁东大学</p>
                <MarkImg src="/ludong.jpg" v-show="endAnim" />
                <p>上海</p>
                <div><img src="/allPeople.jpeg" alt="allPeople" /></div>
            </div>
            <div>
                <div>文稿</div>
                <div>手记</div>
            </div>
            <div class="card5">
                <div>steam</div>
                <div>图书</div>
                <div>追番</div>
                <div>音乐</div>
            </div>
        </slot>
        <slot name="loading" v-if="!isDev">
            <loading @endAnimate="endAnimate" @startAnimate="startAnimate" />
        </slot>
    </div>
</template>
<script setup lang="tsx">
    import { onBeforeMount, onMounted, ref, useTemplateRef, nextTick } from "vue";
    import FcTyping from "../styleComponents/FcTyping.vue";
    import PartocleImg from "../styleComponents/particleImg.vue";
    import IconScroll from "../styleComponents/IconScroll.vue";
    import Loading from "../Loading.vue";
    // import { Content } from 'vitepress'
    import data from "./data";
    import MarkImg from "../styleComponents/MarkImg.vue";
    const isDev = import.meta.env.DEV
    let myTag = data.myTag;
    const endAnim = ref(isDev ? true : false)
    const startAnim = ref(isDev ? true : false)
    function endAnimate() {
        endAnim.value = true
    }
    function startAnimate() {
        startAnim.value = true
    }
</script>
<style lang="css" scoped>
    #BIndex {
        position: relative;
        height: 4000px;
    }

    .left h1 {
        color: red;
    }
</style>
<style lang="css">
    body {
        position: relative;
    }
</style>