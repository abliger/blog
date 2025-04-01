<template>
    <div class="container">
        <div class="middle">
            <div>middle</div>
        </div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.container {
    height: 300px;
    width: 100%;
}

.container>div {
    float: left;
}

.middle {
    height: 100%;
    width: 100%;
    background-color: blanchedalmond;
}

.middle div {
    margin: 0 200px;
}

.left {
    height: 100%;
    background-color: aqua;
    width: 200px;
    margin-left: -100%;
}

.right {
    height: 100%;
    background-color: chocolate;
    width: 200px;
    margin-left: -200px;
}
</style>