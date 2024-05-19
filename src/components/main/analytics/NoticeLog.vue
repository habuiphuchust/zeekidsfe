<template>
  <p class="pulser"></p>
  <el-text class="mx-1" size="large">DOS: {{ numDos }}, Scan Port: {{ numPortScan }}, Injection: {{ numInjection
    }}, Vulnerable: {{ numVulnerable }}</el-text>
  <el-table :data="data" style="width: 100%; height: 500px;">
    <el-table-column prop="time" label="Time" width="180" />
    <el-table-column prop="notice" label="Notice" width="180" />
    <el-table-column prop="attacker" label="Attacker" />
    <el-table-column prop="victim" label="Victim" />
  </el-table>
  <div style="height: 70px;"></div>
</template>

<script lang="ts" setup>
const props = defineProps(['logName'])
console.log(props.logName)

import { ref, onMounted, onBeforeUnmount } from 'vue'
import get from '@/api/get';
import parseLog from '@/until/parseLog';
import constants from '@/until/constants';

let data = ref([])
const rows = ref([]);
const fields = ref([])
const pageSize = ref(200)
const currentPage = ref(1)
const totalElement = ref(0);
const numDos = ref(0)
const numInjection = ref(0)
const numPortScan = ref(0)
const numVulnerable = ref(0)

let intervalId = null;

onMounted(() => {
  upDate();
  if (!intervalId)
    intervalId = setInterval(upDate, 4000);
})

onBeforeUnmount(() => {
  clearInterval(intervalId); // Gỡ bỏ interval
});

async function upDate() {
  const response = await get(constants.api.root + props.logName + "?x=" + Math.random().toString());
  const text = await response.text()
  if (!text) return;
  let parse = parseLog.Parse(text);
  rows.value = parse.rows
  fields.value = parse.fields

  numPortScan.value = 0
  numDos.value = 0
  numInjection.value = 0

  parse.rows.forEach(element => {
    if (element.includes("ScanPort::Scan_Port") || element.includes("ScanModbus::Scan_Port_To_Modbus")) {
      numPortScan.value++
      return;
    }
    if (element.includes("DOS::PING_OF_DEATH") || element.includes("DOS::TCP_SYN_FLUSH") ||
      element.includes("DOS::ICMP_FLUSH") || element.includes("DOS::DNS_AMPLIFICATION")) {
      numDos.value++
      return
    }
    if (element.includes("ModbusInjection::Detect_Retransmission")) {
      numInjection.value++
      return
    }
    if (element.includes("Signature::RESET")) {
      numVulnerable.value++
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
    let date = new Date(timeFloat * 1000)
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
      case "DOS::ICMP_FLUSH":
        notice = "icmp flush attack detection"
        break;
      case "DOS::DNS_AMPLIFICATION":
        notice = "dns amplification attack detection"
        break;
      case "ModbusInjection::Detect_Retransmission":
        notice = "suspected packet injection attack to modbus service"
        break;
      case "Signature::RESET":
        notice = "Detected old reset funtion"
        break;
      default:
        break;
    }
    return {
      id: index,
      time: date.toLocaleString(),
      attacker: value?.["id.orig_h"],
      victim: value?.["id.resp_h"],
      notice
    }
  })
  data.value = newData
}
</script>
<style>
.pulser {
  width: 20px;
  height: 20px;
  background: rebeccapurple;
  border-radius: 50%;
  position: relative;
}

.pulser::after {
  animation: pulse 1000ms cubic-bezier(0.9, 0.7, 0.5, 0.9) infinite;
}

@keyframes pulse {
  0% {
    opacity: 0;
  }

  50% {
    transform: scale(1.4);
    opacity: 0.4;
  }
}

.pulser::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: blueviolet;
  border-radius: 50%;
  z-index: -1;
}
</style>