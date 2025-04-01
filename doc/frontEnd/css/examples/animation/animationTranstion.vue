<template>
    <div class="contenter">
        <div class="box"></div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.contenter {
    background-color: blanchedalmond;
    height: 300px;
    width: 100%;
    display: flex;
    border: 1px solid;
    overflow: hidden;
}

.box {
    background-color: green;
    height: 100px;
    width: 100px;
    margin: auto 0;
    transition: transform 2s;
}

.box:hover {
    transform: translateX(300px);
}
</style>