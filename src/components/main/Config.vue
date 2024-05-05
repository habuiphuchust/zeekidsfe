<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <p>
                    <span>Zeek Status: </span>
                    <span>{{ zeekStatus }}</span>
                </p>
                <el-switch v-model="isRunning" :before-change="switchZeek"/>
            </div>
        </template>
        <textarea class="text item" v-model="config" rows="20" cols="100" :disabled="isDisable">{{ config }}</textarea>
        <template #footer>
            <el-button @click="() => isDisable = false">Edit</el-button>
            <el-button type="primary" @click="Save">Save</el-button>
            <el-button @click="Default">Default</el-button>
        </template>
    </el-card>
</template>

<script setup>
import get from '@/api/get';
import constants from '@/until/constants';
import { onMounted, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import post from '@/api/post';


const config = ref('')
const isDisable = ref(true);
const isRunning = ref(false)
const zeekStatus = ref("")

onMounted(async () => {
    let response = await get(constants.api.config)
    const data = await response.json()
    config.value = data?.message;
    checkStatus()
})

function Save() {
    isDisable.value = true;
    ElMessageBox.confirm(
        'Bạn có muốn lưu cấu hình ?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            let response = await post(constants.api.editconfig, config.value)
            console.log(await response.json())
            ElMessage({
                type: 'success',
                message: 'success',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'canceled',
            })
        })
}

async function Default() {
    let response = await get(constants.api.defaultconfig)
    const data = await response.text()
    config.value = data;
}

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