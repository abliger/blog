<template>
    <div id="temp">
        设置 .float 的 display
        <select v-model="updatedisplay">
            <option value="block">block</option>
            <option value="inline">inline</option>
            <option value="flex">flex</option>
            <option value="grid">grid</option>
        </select>
        <div id="flowRoot">

            <div class="float" :style="{ display: updatedisplay }">
                .float
                <div :class="['box', addFlowRootOne ? 'flow-root' : '']">
                    <p>box</p>
                    <input type="checkbox" v-model="addFlowRootOne">添加 flow-root
                </div>
                <div :class="['box', addFlowRootTwo ? 'flow-root' : '']">
                    <p>box</p>
                    <input type="checkbox" v-model="addFlowRootTwo">添加 flow-root
                </div>
            </div>
            <div :class="['content', addFlowRootThree ? 'flow-root' : '']">
                content
                <div>
                    <input type="checkbox" v-model="addFlowRootThree">添加 flow-root
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const addFlowRootOne = ref(false)
const addFlowRootTwo = ref(false)
const addFlowRootThree = ref(false)
const updatedisplay = ref('block')
</script>
<style scoped>
#temp {
    height: 300px
}

.float {
    float: left;
    background-color: darkgoldenrod;
}

.box {
    background-color: antiquewhite;
}

.box p {
    margin: 20px;
}

.flow-root {
    display: flow-root;
}

.content {
    background-color: aquamarine;
    height: 100px;
    padding: 10px;
}
</style>