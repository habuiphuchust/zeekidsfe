<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
        :ellipsis="false" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="1">{{ store.username + roles }}</el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="4" @click="dialogTableVisible = true">Change password</el-menu-item>
        <el-menu-item index="3" @click="onClick('3')">Log out</el-menu-item>
    </el-menu>
    <el-dialog v-model="dialogTableVisible" title="Change password" width="400">
        <el-form-item label="Old password">
            <el-input v-model="oldPassword" />
        </el-form-item> <el-form-item label="New password">
            <el-input v-model="newPassword" />
        </el-form-item>
        <el-button type="primary" @click="changePassword()">
            Submit
        </el-button>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import token from '@/until/token';
import { ElMessage, ElMessageBox } from 'element-plus'
import post from '@/api/post';
import constants from '@/until/constants';


const router = useRouter()

const store = useUserStore()
const dialogTableVisible = ref(false)
const oldPassword = ref('')
const newPassword = ref('')

let roles = " (";
store?.role?.forEach((value) => {
    roles += value
    roles += ", "
})
roles += ")"

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

function onClick(key: string) {
    console.log(key);
    switch (key) {
        case "3":
            ElMessageBox.confirm(
                'Are you want log out ?',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            )
                .then(() => {
                    token.clearSessionToken()
                    store.setIsLogin(false)
                    store.setToken("")
                    router.push("/login")
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'canceled',
                    })
                })
            break
        case "4":

        default:
            break;
    }

}

function changePassword() {
    ElMessageBox.confirm(
        'Are you want change password ?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            let user = { username: store.username, password: oldPassword.value, newPassword: newPassword.value }
            const response = await post(constants.api.changePassword, JSON.stringify(user))
            const text = await response.text()
            if (response.ok) {
                ElMessage({
                    type: 'success',
                    message: text,
                })
                dialogTableVisible.value = false
            } else {
                ElMessage({
                    type: 'error',
                    message: "fail to change password",
                })
                dialogTableVisible.value = false
            }

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'canceled',
            })
            dialogTableVisible.value = false
        })
}
</script>
<style>
.flex-grow {
    flex-grow: 1;
}

.el-header {
    padding: 0px;
}
</style>