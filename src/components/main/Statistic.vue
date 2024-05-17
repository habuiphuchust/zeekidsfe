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

const value = ref('1+minutes')
const sourceIP = ref('')
const desIP = ref('')

const options = [
  {
    value: '1+minutes',
    label: '1 minute',
  },
  {
    value: '10+minutes',
    label: '10 minutes',
  },
  {
    value: '1+hours',
    label: '1 hour',
  },
  {
    value: '2+hours',
    label: '2 hours',
  },
  {
    value: '10+hours',
    label: '10 hours',
  },
  {
    value: '1+days',
    label: '1 day',
  },
]

</script>