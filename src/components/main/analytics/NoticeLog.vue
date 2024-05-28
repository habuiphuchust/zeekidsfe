<template>
  <p class="pulser"></p>
  <el-text class="mx-1" size="large">DOS: {{ numDos }}, Scan Port: {{ numPortScan }}, Modbus Injection: {{ numInjection
    }}, Modbus harmful: {{ numVulnerable }}</el-text>
  <el-table :data="data" style="width: 100%; height: 500px;" row-class-name="warning-row">
    <el-table-column prop="time" label="Time" width="180" />
    <el-table-column prop="msg" label="Alert" width="180" />
    <el-table-column prop="src" label="Attacker" />
    <el-table-column prop="dst" label="Victim" />
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
  numVulnerable.value = 0

  parse.rows.forEach(element => {
    if (element.includes("ScanPort::Scan_Port") || element.includes("ScanModbus::Scan_Port_To_Modbus")) {
      numPortScan.value++
      return;
    }
    if (element.includes("DOS::PING_OF_DEATH") || element.includes("DOS::TCP_SYN_FLUSH") ||
      element.includes("DOS::ICMP_FLUSH") || element.includes("DOS::DNS_AMPLIFICATION") || element.includes("ModbusDetection::FUNCTION")) {
      numDos.value++
      return
    }
    if (element.includes("ModbusInjection::Detect_Retransmission")) {
      numInjection.value++
      return
    }
    if (element.includes("Signature::RESET") || element.includes("ModbusCovertChannels::Potential_Covert_Channel")
      || element.includes("ModbusDetection::IP_STRANGER")) {
      numVulnerable.value++
      return
    }
  });


  totalElement.value = rows.value.length
  data.value = parseLog.GetData(fields.value, rows.value, pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value).map(element => {
    element.time = new Date(parseFloat(element.ts) * 1000).toLocaleString()
    element.src = `${element["id.orig_h"]}:${element["id.orig_p"]}`
    element.dst = `${element["id.resp_h"]}:${element["id.resp_p"]}`
    return element
  });

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

.warning-row {
  color: red;
}
</style>