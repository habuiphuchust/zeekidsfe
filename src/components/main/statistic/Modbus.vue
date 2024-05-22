<template>
    <!-- <el-button type="primary" round @click="upDate">Cập nhật</el-button> -->
    <CanvasJSChart :options="options" @chart-ref="chartInstance"/>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import get from '@/api/get';
import parseLog from '@/until/parseLog';
import constants from '@/until/constants';


const props = defineProps(['time'])
let epo = props.time / 10

watch(props, () => {
    epo = props.time / 10
    upDate()
})

const chart = ref(null)
const options = ref({
    animationEnabled: true,
    title: {
        text: "Number Of Modbus Packets"
    },
    data: [{
        type: "column",
        xValueType: "dateTime",
        dataPoints: [],
    }],
    axisX: {
        valueFormatString: "H:mm:ss TT"
    },
})

onMounted(upDate)

async function upDate() {
    console.log(epo)
    let res = await get(constants.api.time)
    let timetext = await res.text()
    let now = parseFloat(timetext)

    const response = await get(constants.api.root + "modbus.log" + "?x=" + Math.random().toString());
    const text = await response.text()
    if (!text) return;
    let parse = parseLog.Parse(text);
    let rows = parse.rows.map(element => parseFloat(element.split('\t')[0]) * 1000)
    let dataPoints = []
    for (let i = 9; i >= 0; i--) {
        let y = 0;
        let x = now - epo * i
        rows.forEach(element => {
            if (element < x - epo) return;
            if (element < x) {
                y++
            }
        })
        dataPoints.push({
            x,
            y
        })
    }
    options.value.data[0].dataPoints = dataPoints
    chart.value.render()
}
function chartInstance(chartInstance) {
    chart.value = chartInstance;
}
</script>