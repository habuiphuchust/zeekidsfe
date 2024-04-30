<template>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="notice.log" name="first" lazy><connlog></connlog></el-tab-pane>
      <el-tab-pane label="modbus.log" name="second" lazy><modbuslog></modbuslog></el-tab-pane>
      <el-tab-pane label="conn.log" name="third" lazy><connlog></connlog></el-tab-pane>
      <el-tab-pane label="knownhost.log" name="fourth" lazy>knownhost.log</el-tab-pane>
    </el-tabs>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import connlog from './connlog.vue';
  import modbuslog from './modbuslog.vue'
  
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
  