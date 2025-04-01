<template>
    <div class="container">
        <div class="middle">middle</div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.container {
    height: 300px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.middle {
    order: 2;
    width: 100%;
    background-color: blanchedalmond;
}

.left {
    order: 1;
    background-color: aqua;
    min-width: 200px;

}

.right {
    order: 3;
    background-color: chocolate;
    min-width: 200px;
}
</style>