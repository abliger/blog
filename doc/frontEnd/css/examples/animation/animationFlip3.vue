<template>
  <button @click="randomt">打乱</button>
  <div class="container" ref="container">
    <div class="box" v-for="item in 20" :key="item">{{ item }}</div>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef } from 'vue';
const container = useTemplateRef('container')

function randomt() {
  const children = container.value!.children
  const boxs = Array.from(children).map((item, index) => {
    return {
      item, index
    }
  })

  const start = boxs.reduce((result, item) => {
    return {
      ...result, [item.index]: item.item.getBoundingClientRect()
    }
  }, {})

  boxs.sort(() => Math.random() - 0.3)
  boxs.forEach(box => container.value!.appendChild(box.item))
  const end = boxs.reduce((result, item) => {
    return {
      ...result, [item.index]: item.item.getBoundingClientRect()
    }
  }, {})

  boxs.forEach(box => {
    let st = start[box.index]
    let en = end[box.index]

    let o = st.left - en.left
    let r = st.top - en.top
    console.log(o, r)
    box.item.animate(
      [
        { transform: `translate(${o}px, ${r}px)` },
        { transform: 'translate(0px, 0px)' },
      ],
      { duration: 500, easing: 'ease', fill: 'none', composite: 'accumulate' })
  })
}

</script>
<style scoped>
.container {
  background-color: blanchedalmond;
  height: 300px;
  border: 1px solid;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.box {
  color: white;
  font-size: 30px;
  box-sizing: border-box;
  background-color: skyblue;
  border: 1px black solid;
  margin: 10px;
}
</style>