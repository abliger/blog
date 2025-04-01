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
    padding: 0 200px;
    position: relative;
    overflow: hidden;
    border: 1px solid black;
    min-width: 400px;
}

.container>div {
    float: left;
    height: 100%;
}

.middle {
    position: relative;
    width: 100%;
    background-color: blanchedalmond;
}

.left {
    position: relative;
    background-color: aqua;
    width: 200px;
    margin-left: -100%;
    left: -200px;
}

.right {
    position: relative;
    background-color: chocolate;
    width: 200px;
    margin-left: -200px;
    right: -200px;
}
</style>