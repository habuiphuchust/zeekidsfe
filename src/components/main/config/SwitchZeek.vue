<template>
    <p>Turn on/off zeek: {{ zeekStatus }}</p>
    <el-switch v-model="isRunning" :before-change="switchZeek" :disabled="isAmin" />
</template>
<script setup>
import get from '@/api/get';
import constants from '@/until/constants';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
const store = useUserStore()

const isRunning = ref(false)
const zeekStatus = ref("")
const isAmin = ref(false);

let intervalId = null;

onMounted(async () => {
    console.log(store.role[0])
    isAmin.value = !(store?.role[0] === 'ROLE_ADMIN')
    checkStatus()
    if (!intervalId)
        intervalId = setInterval(checkStatus, 10000);
})

onBeforeUnmount(() => {
    clearInterval(intervalId); // Gỡ bỏ interval
});

async function switchZeek() {
    let change = true;
    let message = "Bạn có muốn bật ZeekIDS?"
    if (isRunning.value) message = "Bạn có muốn tắt ZeekIDS?"
    await ElMessageBox.confirm(
        message,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            change = true;
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'canceled',
            })
            change = false;
        })
    if (change) {
        let response;
        if (isRunning.value) response = await get(constants.api.stopZeek)
        else response = await get(constants.api.startZeek)
        let data = await response.json()
        ElMessage({
            type: 'success',
            message: data?.message,
        })
        setTimeout(checkStatus, 500)
    }
    return false;
}

async function checkStatus() {
    let zeekState = await get(constants.api.checkZeekStatus)
    const states = await zeekState.json()
    isRunning.value = !!states?.status
    zeekStatus.value = states?.message
}
</script>