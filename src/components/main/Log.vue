<template>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="Alert" name="first" lazy><Notice></Notice></el-tab-pane>
      <el-tab-pane label="Modbus packet" name="second" lazy><Modbus></Modbus></el-tab-pane>
      <el-tab-pane label="Connection" name="third" lazy><Connection></Connection></el-tab-pane>
      <el-tab-pane label="Known services" name="fourth" lazy><LogView logName="known_services.log"></LogView></el-tab-pane>
      <el-tab-pane label="Dns" name="six" lazy><Dns></Dns></el-tab-pane>



    </el-tabs>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import LogView from './LogView.vue';
  import Connection from './logs/Connection.vue';
  import Modbus from './logs/Modbus.vue';
  import Dns from './logs/Dns.vue';
  import Notice from './logs/Notice.vue';
  
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
  