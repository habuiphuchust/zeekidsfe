<template>
    <textarea class="text item" v-model="config" rows="20" cols="100" :disabled="isDisable">{{ config }}</textarea>
    <br>
    <el-button @click="() => isDisable = false" :disabled="isAmin">Edit</el-button>
    <el-button type="primary" @click="Save" :disabled="isAmin">Save</el-button>
    <el-button @click="Default" :disabled="isAmin">Default</el-button>
</template>

<script setup>
import get from '@/api/get';
import constants from '@/until/constants';
import { onMounted, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import post from '@/api/post';

const store = useUserStore()

const config = ref('')
const isDisable = ref(true);
const isAmin = ref(false);

onMounted(async () => {
    console.log(store.role[0])
    isAmin.value = !(store?.role[0] === 'ROLE_ADMIN')
    let response = await get(constants.api.config)
    const data = await response.json()
    config.value = data?.message;
})

async function Default() {
    let response = await get(constants.api.defaultconfig)
    const data = await response.text()
    config.value = data;
}

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

</script>