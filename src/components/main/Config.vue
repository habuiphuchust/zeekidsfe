<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <p>
                    <span>Zeek Status: </span>
                    <span v-if="isDisable">running</span>
                    <span v-else>stopped</span>
                </p>
                <el-switch v-model="isDisable" />
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

onMounted(async () => {
    let response = await get(constants.api.config)
    const text = await response.text()
    config.value = text;
})

function Save() {
    isDisable.value = true;
    ElMessageBox.confirm(
        'Bạn có muốn đăng xuất ?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            let response = await post(constants.api.editconfig, config.value)
            console.log(await response.text())
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
    const text = await response.text()
    config.value = text;
}
</script>