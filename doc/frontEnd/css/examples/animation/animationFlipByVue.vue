<template>
    <button @click="randomt">打乱</button>
    <TransitionGroup name="list" class="container" tag="div">
        <div class="box" v-for="item in list" :key="item">{{ item }}</div>
    </TransitionGroup>

</template>
<script setup lang="ts">
import { ref } from 'vue';

const list = ref(new Array(20).fill(0).map(it => Math.random() * 100 | 0))
function randomt() {
    list.value = list.value.sort(() => Math.random() - 0.3)
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