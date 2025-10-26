<template>
    <div id="BIndex">
        <slot>
            <card-one :strs="data.myTag" />
            <card-two />
            <card-three />
            <card-four />
            <card-five />
            <card-six />


        </slot>
        <slot name="loading" v-if="!isDev">
            <loading @endAnimate="endAnimate" @startAnimate="startAnimate" />
        </slot>
    </div>
</template>
<script setup lang="tsx">
    import { provide, ref } from "vue";
    import CardOne from "../cards/CardOne.vue";
    import CardTwo from "../cards/CardTwo.vue";
    import CardThree from "../cards/CardThree.vue";
    import CardFour from "../cards/CardFour.vue";
    import CardFive from "../cards/CardFive.vue";
    import CardSix from "../cards/CardSix.vue";
    import { Loading } from "style-vue";
    import data from "../data";
    const isDev = import.meta.env.DEV
    const endAnim = ref(isDev)
    const startAnim = ref(isDev)
    provide('endAnim', endAnim.value)
    provide('startAnim', startAnim.value)
    provide('skill', data.myLearnedSkill)
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
</style>
<style lang="css">
    body {
        position: relative;
    }
</style>