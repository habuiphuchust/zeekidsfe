<template>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="Notice" name="first" lazy><LogView logName="notice.log"></LogView></el-tab-pane>
      <el-tab-pane label="Modbus packet" name="second" lazy><LogView logName="modbus.log"></LogView></el-tab-pane>
      <el-tab-pane label="Connection" name="third" lazy><LogView logName="conn.log"></LogView></el-tab-pane>
      <el-tab-pane label="Known host" name="fourth" lazy><LogView logName="knownhost.log"></LogView></el-tab-pane>
      <el-tab-pane label="Dns" name="six" lazy><LogView logName="dns.log"></LogView></el-tab-pane>



    </el-tabs>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import LogView from './LogView.vue';
  
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
  