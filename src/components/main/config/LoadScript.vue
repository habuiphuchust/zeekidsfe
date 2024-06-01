<template>
    <el-input v-model="config" placeholder="empty" :autosize="{ minRows: 16, maxRows: 20 }" type="textarea" :disabled="isDisable"/>
    <br>
    <el-button @click="() => isDisable = false" :disabled="isAmin">Edit</el-button>
    <el-button type="primary" @click="Save" :disabled="isAmin">Save</el-button>
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
const props = defineProps(['fileName'])
const emit = defineEmits(['close'])


onMounted(async () => {
    // console.log(store.role[0])
    isAmin.value = !(store?.role[0] === 'ROLE_ADMIN')

    console.log(props.fileName)
    let response = await get(constants.api.configFile + '?path=' + props.fileName)
    if (!response.ok) return;
    const data = await response.text()
    config.value = data;  
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
            let response = await post(constants.api.configFile + '?path=' + props.fileName + '&new=true', config.value)
            if (!response.ok) {
                let message = await response.text()
                ElMessage({
                    type: 'error',
                    message
                })
                return
            }
            ElMessage({
                type: 'success',
                message: 'success',
            })
            emit('close')
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'canceled',
            })
        })
}

</script>