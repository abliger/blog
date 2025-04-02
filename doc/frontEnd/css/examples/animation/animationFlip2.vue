<template>
  <div class="contenter">
    <div class="container" style="display: flex" ref="nums">
      <div class="box" key="1">1</div>
      <div class="box" key="2">2</div>
      <div class="box" key="3">3</div>
      <div class="box" key="4">4</div>
      <div class="box" key="5">5</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
let nums = useTemplateRef('nums')
onMounted(() => {
  const container = nums.value!
  const boxes = Array.from(container!.children)

  boxes.forEach(box => {
    box.addEventListener('click', () => {
      // First: 记录每个盒子的起始位置
      const startPositions = boxes.reduce(
        (result, box, index) => ({
          ...result,
          [index]: box.getBoundingClientRect(),
        }),
        {}
      )

      box.classList.toggle('scale')

      // Last: 记录每个盒子的最终位置
      const endPositions = boxes.reduce(
        (result, box, index) => ({
          ...result,
          [index]: box.getBoundingClientRect(),
        }),
        {}
      )

      // Invert: 计算 “反向” 偏移量
      boxes.forEach((box, index) => {
        const start = startPositions[index]
        const end = endPositions[index]

        // 注意，此时 DOM 已经处于最终位置，所以它的 transform 是 “反向” 的
        // 所以要用 first 来减去 last
        const deltaX = start.left - end.left
        const deltaY = start.top - end.top

        // 如果元素 “原地不动”，那么跳过后续流程
        if (deltaX === 0 && deltaY === 0) {
          return
        }

        // 将盒子通过 transform 移至初始位置
        (box as HTMLElement).style.transition = '';
        (box as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px)`

        // Play: 播放动画应用变换
        requestAnimationFrame(() => {
          (box as HTMLElement).style.transition = 'all 500ms';
          (box as HTMLElement).style.transform = ''
        })

        // FLIP 动画完成后，清理残余样式
        box.addEventListener(
          'transitionend',
          () => {
            (box as HTMLElement).style.transition = '';
            (box as HTMLElement).style.transform = ''
          },
          { once: true }
        )
      })
    })
  })
})

</script>
<style scoped>
.contenter {
  background-color: blanchedalmond;
  height: 300px;
  width: 100%;
  border: 1px solid;
  overflow: hidden;

}

.container {
  position: relative;
}

.box {
  width: 60px;
  height: 60px;
  color: white;
  font-size: 30px;
  margin: 10px;
  box-sizing: border-box;
  background-color: skyblue;
  border: 2px black solid;
  transition: width 500ms, height 500ms;
}

.scale {
  position: absolute;
  top: 90px;
  left: 10px;
  width: 120px;
  height: 120px;
  z-index: 10;
}
</style>