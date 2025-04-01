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
    animation: tran 1s cubic-bezier(0.00, -0.33, 0.99, 1.33) infinite alternate;
}

@keyframes tran {
    0% {
        transform: translateX(0px);
    }

    100% {
        transform: translateX(300px);
    }
}
</style>