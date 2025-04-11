<template>
  <div class="page-container">
    <MySite :nav-opacity="navOpacity" :nav-Scale="navScale" />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

// 注入来自App.vue的透明度值
const navOpacity = inject("headerOpacity", 1); // 默认值1
const navScale = inject("bannerScale", 1); // 默认值1
</script>

<style lang="scss" scoped></style>
