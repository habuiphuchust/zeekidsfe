<template>
    <el-row>
        <el-col>
            <SwitchZeek></SwitchZeek>

        </el-col>
    </el-row>
    <el-row>
        <el-col :span="6">
            <el-statistic :value="totalAlert" value-style="color: red">
                <template #title>
                    <div style="display: inline-flex; align-items: center;">
                        Total Alerts
                        <el-icon style="margin-left: 4px" :size="12">
                        </el-icon>
                    </div>
                </template>
            </el-statistic>
        </el-col>
        <el-col :span="6">
            <el-statistic title="Total Connections" :value="totalConnection" />
        </el-col>
        <el-col :span="6">
            <el-statistic title="Total Running Services" :value="totalService" />
        </el-col>
        <el-col :span="6">
            <el-statistic title="Total DNS Queries" :value="totalDNS">
                <template #suffix>
                    <el-icon style="vertical-align: -0.125em">
                    </el-icon>
                </template>
            </el-statistic>
        </el-col>
    </el-row>
    <!-- <el-button type="primary" round @click="upDate">Cập nhật</el-button> -->
    <CanvasJSChart :options="options" @chart-ref="chartInstance" />
    <CanvasJSChart :options="options2" @chart-ref="chartInstance2" />
    <h4>Filter source, destination of connection: </h4>
    <el-input v-model="input1" style="width: 100px" placeholder="SoureIP" />
    <el-input v-model="input2" style="width: 100px" placeholder="DestIP" />
    <el-button type="primary" @click="filter">Apply</el-button>



</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import get from '@/api/get';
import parseLog from '@/until/parseLog';
import constants from '@/until/constants';
import SwitchZeek from './config/SwitchZeek.vue';

const totalConnection = ref(0)
const totalDNS = ref(0)
const totalAlert = ref(0)
const totalService = ref(0)
const chart = ref(null)
const chart2 = ref(null)
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
        type: "line",
        name: "Building A",
        color: "#00796B",
        xValueType: "dateTime",
        showInLegend: true,
        legendText: "The connection has ended",
        dataPoints: [],
    },
    {
        type: "line",
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

const options2 = ref({
    animationEnabled: true,
    title: {
        text: "Number Of Alerts"
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

    let response = await get(constants.api.log + "conn.log" + "?x=" + Math.random().toString());
    let text = await response.text()
    if (!text) return;
    let parse = parseLog.Parse(text);
    totalConnection.value = parse.rows.length;


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
    for (let i = 100; i > 1; i--) {
        let y1 = 0;
        let y2 = 0
        let x = now + epo - now % epo - epo * i
        rows.forEach(element => {
            if (element.time < x - epo) return;
            if (element.time < x) {
                if (element.state !== "S1") y1++
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

    response = await get(constants.api.log + "notice.log" + "?x=" + Math.random().toString());
    text = await response.text()
    if (!text) return;
    parse = parseLog.Parse(text);
    totalAlert.value = parse.rows.length-1;
    rows = parse.rows.map(element => parseFloat(element.split('\t')[0]) * 1000)
    console.log(rows)
    let dataPoints3 = []
    for (let i = 100; i > 1; i--) {
        let y = 0;
        let x = now + epo - now % epo - epo * i
        rows.forEach(element => {
            if (element < x - epo) return;
            if (element < x) {
                y++
            }
        })
        dataPoints3.push({
            x,
            y
        })
    }
    options2.value.data[0].dataPoints = dataPoints3
    chart2.value.render()



    const res2 = await get(constants.api.log + "dns.log" + "?x=" + Math.random().toString());
    const res3 = await get(constants.api.log + "known_services.log" + "?x=" + Math.random().toString());
    let res2Text = await res2.text()
    let res3Text = await res3.text()
    totalDNS.value = res2Text.split('\n').length -9
    totalService.value = res3Text.split('\n').length -9
}

function chartInstance(chartInstance) {
    chart.value = chartInstance;
}
function chartInstance2(chartInstance) {
    chart2.value = chartInstance;
}

function filter() {
    sourceIP.value = input1.value;
    destIP.value = input2.value
    upDate()
}
</script>

