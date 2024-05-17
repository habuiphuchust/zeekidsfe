<template>
    <!-- <el-button type="primary" round @click="upDate">Cập nhật</el-button> -->
    <el-input v-model="input1" style="width: 100px" placeholder="SoureIP" />
    <el-input v-model="input2" style="width: 100px" placeholder="DestIP" />
    <el-button type="primary" @click="filter">Apply</el-button>
    <CanvasJSChart :options="options" @chart-ref="chartInstance" />
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import get from '@/api/get';
import parseLog from '@/until/parseLog';
import constants from '@/until/constants';


const chart = ref(null)
const sourceIP = ref('')
const destIP = ref('')
const input1 = ref('')
const input2 = ref('')
const options = ref({
    animationEnabled: true,
    title: {
        text: "Number Of Connections"
    },
    legend: {
        cursor: "pointer",
        fontColor: "dimGrey",
    },
    data: [{
        type: "spline",
        name: "Building A",
        color: "#00796B",
        xValueType: "dateTime",
        showInLegend: true,
        legendText: "The connection has ended",
        dataPoints: [],
    },
    {
        type: "spline",
        name: "Building B",
        color: "#FBC02D",
        xValueType: "dateTime",
        showInLegend: true,
        legendText: "The connection has not ended",
        dataPoints: [],
    }],
    axisX: {
        valueFormatString: "H:mm:ss TT"
    },
})

let intervalId = null;

onMounted(() => {
    upDate();
    if (!intervalId)
        intervalId = setInterval(upDate, 10000);
})

onBeforeUnmount(() => {
    clearInterval(intervalId); // Gỡ bỏ interval
});

async function upDate() {
    let epo = 10000
    let res = await get(constants.api.time)
    let timetext = await res.text()
    let now = parseFloat(timetext)

    const response = await get(constants.api.root + "conn.log" + "?x=" + Math.random().toString());
    const text = await response.text()
    if (!text) return;
    let parse = parseLog.Parse(text);

    let rows = parse.rows
    .filter(element => {
        if (destIP.value === '' && sourceIP.value === '') return true;
        if (destIP.value === '') return element.split('\t')[2] === sourceIP.value
        if (sourceIP.value === '') return element.split('\t')[4] === destIP.value
        return element.split('\t')[2] === sourceIP.value && element.split('\t')[4] === destIP.value
    })
    .map(element => {
        let e = {}
        e.time = parseFloat(element.split('\t')[0]) * 1000
        e.state = element.split('\t')[11]
        return e;
    })
    let dataPoints1 = [];
    let dataPoints2 = [];
    for (let i = 20; i > 1; i--) {
        let y1 = 0;
        let y2 = 0
        let x = now + epo - now % epo - epo * i
        rows.forEach(element => {
            if (element.time < x - epo) return;
            if (element.time < x) {
                if (element.state === "S1") y1++
                else y2++
            }
        })
        dataPoints1.push({
            x,
            y: y1
        })
        dataPoints2.push({
            x,
            y: y2
        })
    }
    options.value.data[0].dataPoints = dataPoints1
    options.value.data[1].dataPoints = dataPoints2

    chart.value.render()

}

function chartInstance(chartInstance) {
    chart.value = chartInstance;
}

function filter() {
    sourceIP.value = input1.value;
    destIP.value = input2.value
    upDate()
}
</script>