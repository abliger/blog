<template>
    <div class="contenter">
        <div>

            <div class="box"></div>
        </div>
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
    overflow-y: scroll;
}

.contenter>div {
    height: 1000px;
}

.box {
    background-color: green;
    height: 100px;
    width: 100px;
    margin: auto 0;
    position: sticky;
    top: 20px;
    animation-timeline: scroll();
    animation: tran linear forwards;
}

@keyframes tran {
    0% {
        transform: translateX(0px);
    }

    100% {
        transform: translateX(500px);
    }
}
</style>