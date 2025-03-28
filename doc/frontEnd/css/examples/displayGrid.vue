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
            <div class="item10">item10</div>
            <div class="item11">item11</div>
            <div class="item12">item12</div>
            <div class="item13">item13</div>
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
    grid-template-columns: auto auto auto auto;
    border: 1px solid;

}

.item1 {
    grid-row: 1 / span 2;
    grid-column: 1/span 2;
    /* justify-self: center;
    align-self: center; */
    display: grid;
    place-items: center;
}

span::first-letter {
    text-transform: uppercase !important;
    font-size: 5em;
    font-weight: bold;
    color: brown;
}

.grid>div {
    padding: 30px;
    background-color: cadetblue;
    border: 1px solid;
}
</style>