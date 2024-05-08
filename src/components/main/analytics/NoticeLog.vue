<template>
  <el-button type="primary" round @click="upDate">Cập nhật</el-button>

  <el-input v-model="search" style="width: 50%; margin-left: 50%; margin-top: -6rem;" size="small"
    placeholder="Type to search" />
  <el-text class="mx-1" size="large">DOS: {{ numDos }}, Scan Port: {{ numPortScan }}, Injection: {{ numInjection }}</el-text>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="time" label="Time" width="180" />
    <el-table-column prop="notice" label="Notice" width="180" />
    <el-table-column prop="attacker" label="Attacker" />
    <el-table-column prop="victim" label="Victim" />
  </el-table> 
  <el-pagination :page-size="pageSize" :pager-count="7" layout="prev, pager, next" :total="totalElement"
    @current-change="val => getPage(val)" />
</template>

<script lang="ts" setup>
const props = defineProps(['logName'])
console.log(props.logName)

import { ref, onMounted, watch } from 'vue'
import get from '@/api/get';
import parseLog from '@/until/parseLog';
import constants from '@/until/constants';

let data = ref([])
const search = ref('')
const filter = ref([])
const rows = ref([]);
const fields = ref([])
const pageSize = ref(200)
const currentPage = ref(1)
const totalElement = ref(0);
const numDos = ref(0)
const numInjection = ref(0)
const numPortScan = ref(0)

onMounted(upDate)


watch(search, async () => {
  let keyword = search.value.split('&&');
  filter.value = rows.value.filter((value: String) => {
    for (let i = 0; i < keyword.length; i++) {
      if (!value.includes(keyword[i].trim())) return false;
    }
    return true;
  })
  totalElement.value = filter.value.length
  let parseData = parseLog.GetData(fields.value, filter.value, pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
  convertData(parseData)
})

function getPage(curPage) {
  currentPage.value = curPage
  let parseData = parseLog.GetData(fields.value, filter.value, pageSize.value * (curPage - 1), pageSize.value * curPage);
  convertData(parseData)
}

async function upDate() {
  const response = await get(constants.api.root + props.logName + "?x=" + Math.random().toString());
  const text = await response.text()
  if (!text) return;
  let parse = parseLog.Parse(text);
  rows.value = parse.rows
  fields.value = parse.fields
  filter.value = parse.rows

  numPortScan.value = 0
  numDos.value = 0
  numInjection.value = 0
  
  parse.rows.forEach(element => {
    if (element.includes("ScanPort::Scan_Port") || element.includes("ScanModbus::Scan_Port_To_Modbus")){
      numPortScan.value++
      return;
    }
    if (element.includes("DOS::PING_OF_DEATH") || element.includes("DOS::TCP_SYN_FLUSH")){
      numDos.value++
      return
    }
    if (element.includes("ModbusInjection::Detect_Retransmission")){
      numInjection.value++
      return
    }
  });


  totalElement.value = rows.value.length
  let parseData = parseLog.GetData(fields.value, rows.value, pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
  convertData(parseData)

}

function convertData(oldData) {
  let newData = oldData.map((value, index) => {
    let timeFloat = parseFloat(value?.ts)
    if (Number.isNaN(timeFloat)) return;
    let date = new Date(timeFloat* 1000 + 7*3600000)
    let notice = "";
    switch (value?.note) {
      case "ScanPort::Scan_Port":
        notice = "Detect scan port"
        break;
      case "ScanModbus::Scan_Port_To_Modbus":
        notice = "Detect scan to modbus service"
        break;
      case "DOS::PING_OF_DEATH":
        notice = "Ping of Death attack detection"
        break;
      case "DOS::TCP_SYN_FLUSH":
        notice = "tcp syn flush attack detection"
        break;
      case "ModbusInjection::Detect_Retransmission":
        notice = "suspected packet injection attack to modbus service"
        break;
      default:
        break;
    }
    return {
      id: index,
      time: date.toISOString(),
      attacker: value?.["id.orig_h"],
      victim: value?.["id.resp_h"],
      notice
    }
  })
  data.value = newData
}
</script>