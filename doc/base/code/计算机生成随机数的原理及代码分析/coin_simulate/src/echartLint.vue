<template>
  <v-chart ref="echartTable" class="chart" :option="option" />
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  GridComponent,
  LineChart,
  TitleComponent,
  CanvasRenderer,
  LegendComponent,
  TooltipComponent,
]);

const prop = defineProps({
  num: {
    type: Number,
    required: true,
  },
  coin: [Number],
  title: String,
  legend: [String],
});

const option = computed(() => {
  return {
    xAxis: {
      type: "category",
      data: Array.from({ length: prop.num }, (_, i) => i),
    },
    yAxis: {
      type: "value",
    },
    legend: {
      data: prop.legend,
    },
    series: prop.coin,
    title: [
      {
        //left: "center",
        text: prop.title,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
});
//watch(prop, async (a, b) => {
//  console.log(option);
//  echartTable.setOption(option);
//});

const echartTable = ref();

function updateDate() {
  //echartTable.setOption(op)
}
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
