<template>
    <div id="temp">
        <div class="grid">
            <div class="item1"><span>item1</span></div>
            <div class="item2">item2</div>
            <div class="item3">item3</div>
            <div class="item4">item4</div>
            <div class="item5">item5</div>
            <div class="item6">item6</div>
            <div class="item7">item7</div>
            <div class="item8">item8</div>
            <div class="item9">item9</div>
            <div class="item11">item11</div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
#temp {
    height: 400px;
    width: 100%;
    background-color: bisque;
}

.grid {
    display: grid;
    box-sizing: border-box;
    grid-gap: 10px;
    grid-template-areas: "box box auto auto"
        "box box auto auto";
    border: 1px solid;

}

.item1 {
    display: grid;
    place-items: center;
    grid-area: box;
}

.item11 {
    grid-column: 2 /span 3;
}

.item2 {
    grid-area: 1 / 3 / span 3 / span 2;
}

.grid>div {
    padding: 30px;
    background-color: cadetblue;
    border: 1px solid;
}
</style>