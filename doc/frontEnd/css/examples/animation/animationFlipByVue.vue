<template>
    <button @click="sort">排序</button>
    <button @click="random">打乱</button>
    <TransitionGroup name="list" class="container" tag="div">
        <div class="box" v-for="item in list" :key="item">{{ item }}</div>
    </TransitionGroup>

</template>
<script setup lang="ts">
import { ref } from 'vue';

const list = ref(new Array(20).fill(0).map((v, i) => i).sort(() => Math.random() - 0.5))
function sort() {
    list.value = list.value.sort((a, b) => a - b)
}
function random() {
    list.value = list.value.sort(() => Math.random() - 0.5)
}

</script>
<style scoped>
.container {
    background-color: blanchedalmond;
    height: 300px;
    border: 1px solid;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}

.box {
    color: white;
    font-size: 30px;
    box-sizing: border-box;
    background-color: skyblue;
    border: 1px black solid;
    margin: 10px;
}

.list-move {
    transition: all 2s;
}
</style>