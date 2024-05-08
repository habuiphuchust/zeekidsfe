<template>
    <!-- <el-button type="primary" round @click="upDate">Cập nhật</el-button> -->
    <CanvasJSChart :options="options" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import get from '@/api/get';
import parseLog from '@/until/parseLog';
import constants from '@/until/constants';

const chart = ref(null)
const options = ref({
    animationEnabled: true,
    title: {
        text: "Modbus Packet Chart last 5 minutes"
    },
    data: [{
        type: "column",
        dataPoints: [
            { id: 5, label: "5 minutes ago", y: 0 },
            { id: 4, label: "4 minutes ago", y: 0 },
            { id: 3, label: "3 minutes ago", y: 0 },
            { id: 2, label: "2 minutes ago", y: 0 },
            { id: 1, label: "1 minute ago", y: 0 },
        ],
    }]
})

onMounted(upDate)

async function upDate() {
    let res = await get(constants.api.time)
    let timetext = await res.text()
    let now = parseFloat(timetext)
    console.log(now)
    let epo = 60000
    let dataPoints = [
        { id: 5, label: "5 minutes ago", time: now - 5 * epo, y: 0 },
        { id: 4, label: "4 minutes ago", time: now - 4 * epo, y: 0 },
        { id: 3, label: "3 minutes ago", time: now - 3 * epo, y: 0 },
        { id: 2, label: "2 minutes ago", time: now - 2 * epo, y: 0 },
        { id: 1, label: "1 minute ago", time: now - epo, y: 0 },
    ]

    const response = await get(constants.api.root + "conn.log" + "?x=" + Math.random().toString());
    const text = await response.text()
    if (!text) return;
    let parse = parseLog.Parse(text);
    let rows = parse.rows.map(element => parseFloat(element.split('\t')[0]) * 1000)
    rows.forEach(element => {
        if (element < dataPoints[0].time) return;
        if (element < dataPoints[1].time) {
            dataPoints[0].y++;
            return;
        }
        if (element < dataPoints[2].time) {
            dataPoints[1].y++;
            return;
        }
        if (element < dataPoints[3].time) {
            dataPoints[2].y++;
            return;
        }
        if (element < dataPoints[4].time) {
            dataPoints[3].y++;
            return;
        }
        if (element < now) {
            dataPoints[4].y++;
            return;
        }
    });
    console.log(dataPoints)
    options.value = {
        animationEnabled: true,
        title: {
            text: "Connection Chart last 5 minutes"
        },
        data: [{
            type: "column",
            dataPoints,
        }]
    }
}
</script>