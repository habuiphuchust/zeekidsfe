<template>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="notice.log" name="first"><connlog></connlog></el-tab-pane>
      <el-tab-pane label="modbus.log" name="second">modbus.log</el-tab-pane>
      <el-tab-pane label="conn.log" name="third"><connlog></connlog></el-tab-pane>
      <el-tab-pane label="knownhost.log" name="fourth">knownhost.log</el-tab-pane>
    </el-tabs>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import connlog from './connlog.vue';
  
  const activeName = ref('first')
  
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }
  </script>
  <style>
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  </style>
  