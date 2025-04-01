<template>
    <div class="contenter">
        <div class="container" style="display: flex" ref="nums">
            <div class="box" key="1">1</div>
            <div class="box" key="2">2</div>
            <div class="box" key="3">3</div>
            <div class="box" key="4">4</div>
            <div class="box" key="5">5</div>
        </div>
        <button @click="shuffle">打乱</button>
    </div>
</template>
<script setup lang="ts">
import { nextTick } from 'vue';
import { ref, useTemplateRef } from 'vue';
let nums = useTemplateRef('nums')
function shuffle() {
    const container = document.querySelector('.container')!
    const boxes = Array.from(container.children).map((item, index) => { return { item, index } })
    // First: 记录每个盒子的起始位置
    const startPositions = boxes.reduce(
        (result, box) => ({ ...result, [box.index]: box.item.getBoundingClientRect() }),
        {}
    )
    // 随机打乱盒子顺序，然后把打乱好的盒子放回 DOM
    boxes.sort(() => Math.random() - 0.5)
    boxes.forEach(box => container.appendChild(box.item))

    // Last: 记录每个盒子的最终位置
    const endPositions = boxes.reduce(
        (result, box, index) => ({ ...result, [box.index]: box.item.getBoundingClientRect() }),
        {}
    )
    // Invert: 计算 “反向” 偏移量
    boxes.forEach((box) => {
        let boxc = box.item as HTMLElement
        const start = startPositions[box.index]
        const end = endPositions[box.index]

        // 注意，此时 DOM 已经处于最终位置，所以它的 translate 是 “反向” 的
        // 所以要用 start 来减去 end
        const deltaX = start.left - end.left
        const deltaY = start.top - end.top
        boxc.animate(
            [
                { transform: `translate(${deltaX}px, ${deltaY}px)` },
                { transform: 'translate(0px, 0px)' },
            ],
            { duration: 500, easing: 'ease', fill: 'none', composite: 'accumulate' }
        )

    })
}

</script>
<style scoped>
.contenter {
    background-color: blanchedalmond;
    height: 300px;
    width: 100%;
    border: 1px solid;
    overflow: hidden;
}

.box {
    width: 60px;
    height: 60px;
    background-color: skyblue;
    color: white;
    font-size: 30px;
    margin: 10px;
}
</style>