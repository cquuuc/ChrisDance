<template>
  <div>责任界面</div>
  <div id="zeren"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  PolarComponent,
  PolarComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  PolarComponent,
  TooltipComponent,
  BarChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | PolarComponentOption
  | TooltipComponentOption
  | BarSeriesOption
>;

let myChart: echarts.ECharts | null = null;

const initChart = () => {
  const chartDom = document.getElementById("zeren")!;
  myChart = echarts.init(chartDom);

  const option: EChartsOption = {
    title: [
      {
        text: "Tangential Polar Bar Label Position (middle)",
      },
    ],
    polar: {
      radius: [30, "80%"],
    },
    angleAxis: {
      max: 4,
      startAngle: 75,
    },
    radiusAxis: {
      type: "category",
      data: ["a", "b", "c", "d"],
    },
    tooltip: {},
    series: {
      type: "bar",
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: "polar",
      label: {
        show: true,
        position: "middle",
        formatter: "{b}: {c}",
      },
    },
  };

  option && myChart.setOption(option);
};

onMounted(() => {
  initChart();

  window.addEventListener("resize", () => {
    myChart.resize();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {
    myChart.resize();
  });
});
</script>

<style lang="scss" scoped>
#zeren {
  width: 60vw;
  height: 40vw;
}
</style>
