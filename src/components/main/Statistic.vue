<template>
  <el-select v-model="value" placeholder="Select" size="large" style="width: 240px">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <div style="height: 600px;">
    <el-row>
      <el-col :span="24">
        <Connection :time="value"></Connection>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <Modbus :time="value"></Modbus>
      </el-col>
      <el-col :span="12">
        <Notice :time="value"></Notice>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Modbus from "./statistic/Modbus.vue"
import Connection from "./statistic/Connection.vue"
import Notice from "./statistic/Notice.vue"

const value = ref('600000')

const options = [
  {
    value: '600000',
    label: '10 minutes',
  },
  {
    value: 3600000,
    label: '1 hour',
  },
  {
    value: 7200000,
    label: '2 hours',
  },
  {
    value: 36000000,
    label: '10 hours',
  },
  {
    value: 86400000,
    label: '1 day',
  },
  {
    value: 604800000,
    label: '7 day',
  },
]

</script>