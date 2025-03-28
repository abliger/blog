<template>
    <div id="postions_examples">
        <div class="position">
            <div>
                <h1 class="static">static</h1>
            </div>
            <div></div>
        </div>
        <div class="position">
            <div>
                <h1 class="relative">relative</h1>
                <span>会在其在文档流中的正常位置进行偏移,但仍然保留原来的空间</span>
            </div>
            <div></div>
        </div>
        <div class="position">
            <div>
                <h1 class="absolute">absolute</h1>
                <span>会脱离文档流,其位置取决于最近的非 static 定位的祖先元素</span>
            </div>
            <div></div>
        </div>
        <div class="position">
            <div>
                <h1 class="fixed">fixed</h1>
            </div>
            <div></div>
        </div>
        <div class="position">
            <div>
                <h1 class="sticky">sticky</h1>
            </div>
            <div></div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
#postions_examples {
    height: 400px;
    position: relative;
}

.position {
    float: left;
    height: 400px;
    width: calc(20% - 6px);
    background-color: red;
    margin: 0px 1px;
    overflow: scroll
}

.position>div {
    height: 1000px;
    background-color: aqua;
}

.position div:last-child {
    background-color: bisque
}

.sticky {
    position: sticky;
    top: 10px;
}

.fixed {
    position: fixed;
    top: 10px;
}

.absolute {
    position: absolute;
    top: 300px;
    right: 100px
}

.relative {
    border: 2px solid black;
    margin: 20px 0px;
    position: relative;
    top: 200px;
}

.static {
    border: 2px solid black;
    margin: 20px 0px;
    position: static;
    top: 200px;
}
</style>