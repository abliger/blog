<template>
    <div id="temp">
        <div class="contenter">
            <template v-for="(item, index) in 20">
                <div class="item" :style="getRandom()">item{{ index }}</div>
            </template>
        </div>
    </div>

</template>
<script setup lang="ts">
function getRandom() {
    return {
        height: (Math.max(Math.random() * 300 | 0, 100)) + 'px'
    }
}
</script>
<style scoped>
#temp {
    height: 300px;
    overflow-y: scroll;
}

.contenter {
    background-color: aquamarine;
    column-count: 3;
    column-gap: 10px;
    padding: 10px;
}

.item {
    background-color: beige;
    break-inside: avoid;
    margin-bottom: 1vw;
}
</style>