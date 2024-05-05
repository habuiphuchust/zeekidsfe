<template>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="notice.log" name="first" lazy><LogView logName="notice.log"></LogView></el-tab-pane>
      <el-tab-pane label="modbus.log" name="second" lazy><LogView logName="modbus.log"></LogView></el-tab-pane>
      <el-tab-pane label="conn.log" name="third" lazy><LogView logName="conn.log"></LogView></el-tab-pane>
      <el-tab-pane label="knownhost.log" name="fourth" lazy><LogView logName="knownhost.log"></LogView></el-tab-pane>
      <el-tab-pane label="dhcp.log" name="five" lazy><LogView logName="dhcp.log"></LogView></el-tab-pane>
      <el-tab-pane label="dns.log" name="six" lazy><LogView logName="dns.log"></LogView></el-tab-pane>
      <el-tab-pane label="reporter.log" name="seven" lazy><LogView logName="reporter.log"></LogView></el-tab-pane>
      <el-tab-pane label="weird.log" name="eight" lazy><LogView logName="weird.log"></LogView></el-tab-pane>
      <el-tab-pane label="files.log" name="nine" lazy><LogView logName="files.log"></LogView></el-tab-pane>
      <el-tab-pane label="http.log" name="ten" lazy><LogView logName="http.log"></LogView></el-tab-pane>



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
  