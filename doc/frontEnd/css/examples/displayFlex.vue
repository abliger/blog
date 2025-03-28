<template>
    <div id="temp">
        <div>
            <span>justify-content: </span>
            <select v-model="useJustifyCon">
                <option value="initial">initial</option>
                <option value="start">start</option>
                <option value="center">center</option>
                <option value="end">end</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="stretch">stretch</option>
                <option value="space-around">space-around</option>
                <option value="space-between">space-between</option>
                <option value="space-evenly">space-evenly</option>
                <option value="baseline">baseline</option>
                <option value="first baseline">first baseline</option>
                <option value="last baseline">last baseline</option>
                <option value="unsafe">unsafe</option>
                <option value="safe">safe</option>
            </select>
            <span>align-content:</span>
            <select v-model="usealignCon">
                <option value="initial">initial</option>
                <option value="start">start</option>
                <option value="center">center</option>
                <option value="end">end</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="stretch">stretch</option>
                <option value="space-around">space-around</option>
                <option value="space-between">space-between</option>
                <option value="space-evenly">space-evenly</option>
                <option value="baseline">baseline</option>
                <option value="first baseline">first baseline</option>
                <option value="last baseline">last baseline</option>
                <option value="unsafe">unsafe</option>
                <option value="safe">safe</option>
            </select>
            <br />
            <span>justify-items: </span>
            <select v-model="useJustifyitems">
                <option value="initial">initial</option>
                <option value="start">start</option>
                <option value="center">center</option>
                <option value="end">end</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="stretch">stretch</option>
                <option value="space-around">space-around</option>
                <option value="space-between">space-between</option>
                <option value="space-evenly">space-evenly</option>
                <option value="baseline">baseline</option>
                <option value="first baseline">first baseline</option>
                <option value="last baseline">last baseline</option>
                <option value="unsafe">unsafe</option>
                <option value="safe">safe</option>
            </select>
            <span>align-items:</span>
            <select v-model="usealignitems">
                <option value="initial">initial</option>
                <option value="start">start</option>
                <option value="center">center</option>
                <option value="end">end</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="stretch">stretch</option>
                <option value="space-around">space-around</option>
                <option value="space-between">space-between</option>
                <option value="space-evenly">space-evenly</option>
                <option value="baseline">baseline</option>
                <option value="first baseline">first baseline</option>
                <option value="last baseline">last baseline</option>
                <option value="unsafe">unsafe</option>
                <option value="safe">safe</option>
            </select>
            <br />
            <span>flex-direction:</span>
            <select v-model="useDirection">
                <option value="row">row</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column">column</option>
                <option value="column-reverse">column-reverse</option>
            </select>
            <span>flex-wrap:</span>
            <select v-model="useWrap">
                <option value="nowrap">nowrap</option>
                <option value="wrap">wrap</option>
                <option value="wrap-reverse">wrap-reverse</option>
            </select>
            <br />
            <span>flex-grow 和 flex-shrink 控制</span>
            <input type="checkbox" v-model="isgrow" />
        </div>
        <div>
            <span>card6 justify-self 和 align-self: </span>
            <select v-model="useCardJustifySelf">
                <option value="initial">initial</option>
                <option value="start">start</option>
                <option value="center">center</option>
                <option value="end">end</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="stretch">stretch</option>
                <option value="space-around">space-around</option>
                <option value="space-between">space-between</option>
                <option value="space-evenly">space-evenly</option>
                <option value="baseline">baseline</option>
                <option value="first baseline">first baseline</option>
                <option value="last baseline">last baseline</option>
                <option value="unsafe">unsafe</option>
                <option value="safe">safe</option>
            </select>
            <select v-model="useCardAlignSelf">
                <option value="initial">initial</option>
                <option value="start">start</option>
                <option value="center">center</option>
                <option value="end">end</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="stretch">stretch</option>
                <option value="space-around">space-around</option>
                <option value="space-between">space-between</option>
                <option value="space-evenly">space-evenly</option>
                <option value="baseline">baseline</option>
                <option value="first baseline">first baseline</option>
                <option value="last baseline">last baseline</option>
                <option value="unsafe">unsafe</option>
                <option value="safe">safe</option>
            </select>
        </div>
        <div id="flex" :style="sty" ref="cardRef">
            <template v-for="(item, index) in cardsHW" :id="index">
                <div :class="['card', index >= 6 ? isgrow ? 'box' : '' : '']" :style="[item, index === 6 ? card : '']">
                    <div>card{{ index }}</div>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { watchEffect } from 'vue';
import { computed, ref } from 'vue';
const style = JSON.parse(localStorage.getItem('abliger-flex-test') || '{}')

const useJustifyCon = ref(style['justify-content'] || 'initial')
const usealignCon = ref(style['align-content'] || 'initial')
const useJustifyitems = ref(style['justify-items'] || 'initial')
const usealignitems = ref(style['align-items'] || 'initial')
const useDirection = ref(style['flex-direction'] || 'row')
const useWrap = ref(style['flex-wrap'] || 'unwrap')
const useCardJustifySelf = ref('initial')
const useCardAlignSelf = ref('initial')
const isgrow = ref(false)
const cardsHW = [
    { height: '100px', width: '160px' },
    { height: '110px', width: '60px' },
    { height: '70px', width: '80px' },
    { height: '130px', width: '70px' },
    { height: '60px', width: '100px' },
    { height: '100px', width: '60px' },
    { height: '140px', width: '60px' },
]
const sty = computed(() => {
    return {
        'justify-content': useJustifyCon.value,
        'align-content': usealignCon.value,
        'justify-items': useJustifyitems.value,
        'align-items': usealignitems.value,
        'flex-direction': useDirection.value,
        'flex-wrap': useWrap.value
    }
})
const card = computed(() => {
    return {
        'justify-self': useCardJustifySelf.value,
        'align-self': useCardAlignSelf.value,
    }
})
watchEffect(() => {
    localStorage.setItem('abliger-flex-test', JSON.stringify(sty.value))
})

</script>
<style scoped>
#temp {
    height: 600px;
    width: 100%;
}

#flex {
    display: flex;
    height: 300px;
    border: 3px solid red;
    resize: both;
    overflow: scroll;
}

.card {
    margin: 10px;
    min-width: 80px;
    background-color: cadetblue;
    border: 1px solid black;
    order: 1;
}

.box {
    flex-grow: 3;
    flex-shrink: 20;
    order: 90;
}

/* 
div:not(.box) {
    flex-grow: 1;
    flex-shrink: 1;
}
*/
</style>