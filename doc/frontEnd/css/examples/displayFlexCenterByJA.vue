<template>
    <div id="temp">
        <div class="center"></div>
        <div class="center"></div>
        <div class="center"></div>
        <div class="center"></div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
#temp {
    display: flex;
    height: 200px;
    width: 100%;
    background-color: bisque;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    border: 1px solid;
    resize: both;
    overflow: auto;
    box-sizing: border-box;
}

.center {
    height: 100px;
    width: 100px;
    margin: 10px;
    background-color: aquamarine;
}
</style>