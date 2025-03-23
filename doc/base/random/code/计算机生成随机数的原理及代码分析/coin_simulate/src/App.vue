<template>
  <EchartLint :num="num" :coin="coin1" :legend="legend" title="随机数生成器">
  </EchartLint>
  <br />
  <label for="volume">a:{{ a }}</label>
  <input
    type="range"
    id="volume"
    name="volume"
    min="0"
    max="1000000000"
    v-model="a"
  />
  <br />
  <label for="volume">b:{{ b }}</label>
  <input
    type="range"
    id="volume"
    name="volume"
    min="0"
    max="1000000000"
    v-model="b"
  />
  <br />
  <label for="volume">c:{{ c }}</label>
  <input
    type="range"
    id="volume"
    name="volume"
    min="0"
    max="1000000000"
    v-model="c"
  />
  <br />
  <label for="seed">seed:</label>
  <input id="seed" v-model="seed" />
  <br />
  <label for="num">次数:</label>
  <input id="num" v-model="num" />
  <div>线性同余公式 ( {{ a }} * {{ seed }} + {{ b }} ) mod {{ c }}</div>
</template>
<script setup>
import EchartLint from "./echartLint.vue";
import { ref, computed } from "vue";
import { LinearCongruentialGenerator } from "./RandGen.js";
let a = ref(44343345799);
let b = ref(32331235);
let c = ref(321285433);
let seed = ref(342123);
function getCoin(num) {
  let arr = [];
  let coin = 1000;
  var rand = new LinearCongruentialGenerator(
    a.value,
    b.value,
    c.value,
    seed.value,
  );
  for (let i = 0; i < num; i++) {
    if (rand.next() >= 0.5) {
      coin += 1;
    } else {
      coin -= 1;
    }
    arr.push(coin);
  }
  return arr;
}
function getCoinByDefault(num) {
  let arr = [];
  let coin = 1000;
  for (let i = 0; i < num; i++) {
    if (Math.random() >= 0.5) {
      coin += 1;
    } else {
      coin -= 1;
    }
    arr.push(coin);
  }
  return arr;
}

const num = ref(10000);
const coin1 = computed(() => {
  return [
    { data: getCoin(num.value), type: "line", name: "自定义线性同余" },
    {
      data: getCoinByDefault(num.value),
      type: "line",
      name: "系统默认随机数生成器",
    },
  ];
});
const legend = ref(["自定义线性同余", "系统默认随机数生成器"]);
</script>
