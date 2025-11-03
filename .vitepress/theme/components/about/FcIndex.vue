<template>
    <div id="BIndex">
        <slot>
            <card-one :strs="data.myTag" />
            <card-two />
            <ShuffleText effect="fx3"><card-three /></ShuffleText>
            <card-four />
            <card-five />
            <card-six />
        </slot>
        <slot v-if="!isDev" name="loading">
            <loading @end-animate="endAnimate" @start-animate="startAnimate" />
        </slot>
    </div>
</template>
<script setup lang="tsx">
    import { provide, ref } from 'vue'
    import CardOne from '../cards/CardOne.vue'
    import CardTwo from '../cards/CardTwo.vue'
    import CardThree from '../cards/CardThree.vue'
    import CardFour from '../cards/CardFour.vue'
    import CardFive from '../cards/CardFive.vue'
    import CardSix from '../cards/CardSix.vue'
    import { Loading } from 'style-vue'
    import data from '../data'
    import ShuffleText from '../styleComponents/ShuffleText.vue'
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

    #BIndex {
        box-sizing: content-box;
    }
</style>
