<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
        :ellipsis="false" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="1">{{ store.username + roles }}</el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="3" @click="onClick('3')">Đăng xuất</el-menu-item>
        <el-sub-menu index="4">
            <template #title>Option3</template>
            <el-menu-item index="4-1">item one</el-menu-item>
            <el-menu-item index="4-2">item two</el-menu-item>
            <el-menu-item index="4-3">item three</el-menu-item>
            <el-sub-menu index="4-4">
                <template #title>item four</template>
                <el-menu-item index="4-4-1">item one</el-menu-item>
                <el-menu-item index="4-4-2">item two</el-menu-item>
                <el-menu-item index="4-4-3">item three</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import token from '@/until/token';
import { ElMessage, ElMessageBox } from 'element-plus'


const router = useRouter()

const store = useUserStore()
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
                'Bạn có muốn đăng xuất ?',
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
        default:
            break;
    }

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