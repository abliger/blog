<template>
    <div class="container">
        <div class="box"></div>
    </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.container {
    height: 300px;
    width: 100%;
    position: relative;
    background-color: aquamarine;
}

.box {
    width: 100px;
    height: 100px;
    background-color: blanchedalmond;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>