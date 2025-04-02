<template>
    <div class="g-contenter">
        <div class="g-flex">
            <div class="g-item box1">1</div>
            <div class="g-item box2">2</div>
            <div class="g-item box3">3</div>
        </div>
        <div class="g-grid">
            <div class="g-item box1">1</div>
            <div class="g-item box2">2</div>
            <div class="g-item box3">3</div>
        </div>
    </div>

</template>
<script setup lang="ts">
</script>
<style scoped>
.g-container {
    margin: 20px auto;
    width: 400px;

}

.g-item {
    background-color: antiquewhite;
    width: 190px;
    height: 190px;
    box-sizing: border-box;
    border: 1px solid #666;
    border-radius: 10px;
    line-height: 190px;
    font-size: 32px;
    text-align: center;
    cursor: pointer;
    margin: 5px;
    transition: .1s all;
}

.g-flex {
    background-color: burlywood;
    width: 400px;
    height: 400px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;

    .g-item:first-child {
        height: 390px;
    }
}

.g-flex:hover {
    flex-direction: row;

    .g-item:first-child {
        height: 190px;
        width: 390px;
    }
}

.g-grid {
    background-color: burlywood;
    width: 400px;
    height: 400px;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(2, 50%);

    .g-item {
        width: unset;
        height: unset;

    }

    .g-item:first-child {
        grid-row: 1 / 3;
        grid-column: 1 / 2;
    }
}

.g-grid:hover {
    .g-item:first-child {
        grid-row: 1 / 2;
        grid-column: 1 / 3;
    }
}
</style>