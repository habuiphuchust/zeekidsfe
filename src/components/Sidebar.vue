<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="5"
        text-color="#fff" @open="handleOpen" @close="handleClose">
        <el-menu-item index="5" @click="onClick('5')">
            <el-icon><icon-menu /></el-icon>
            <span>Dash Board</span>
        </el-menu-item>
        <el-menu-item index="1" @click="onClick('1')">
            <el-icon><icon-menu /></el-icon>
            <span>View Log</span>
        </el-menu-item>
        <el-menu-item index="2" @click="onClick('2')">
            <el-icon>
                <setting />
            </el-icon> <span>Setting</span>
        </el-menu-item>
        <el-menu-item index="3" @click="onClick('3')">
            <el-icon>
                <document />
            </el-icon>
            <span>Statistic</span>
        </el-menu-item>
        <el-menu-item index="4" @click="onClick('4')">
            <el-icon><icon-menu /></el-icon>
            <el-badge :value="notice" class="item" :offset="[20, 20]">
                Alert
            </el-badge>
        </el-menu-item>
        <el-menu-item index="6" @click="onClick('6')" v-if="(store?.role[0] === 'ROLE_ADMIN')">
            <el-icon>
                <document />
            </el-icon>
            <span>User</span>
        </el-menu-item>
    </el-menu>

</template>

<script lang="ts" setup>
import get from '@/api/get';
import constants from '@/until/constants';
import {
    Document,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const store = useUserStore()


const router = useRouter()

const notice = ref(0);

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

function onClick(key: string) {
    console.log(key);
    switch (key) {
        case "1":
            router.push("/log")
            break;
        case "2":
            router.push("/config")
            break;
        case "3":
            router.push("/statistic")
            break;
        case "4":
            router.push("/log-analytic")
            break;
        case "5":
            router.push("/dashboard")
            break;
        case "6":
            router.push("/users")
            break;
        default:
            break;
    }

}

let intervalId = null;

onMounted(async () => {
    const response1 = await get(constants.api.log + "notice.log?x=" + Math.random().toString());
    const text1 = await response1.text()
    notice.value = text1.split('\n').length - 9
    console.log(notice.value)
    if (!intervalId)
        intervalId = setInterval(async () => {
            const response = await get(constants.api.log + "notice.log?x=" + Math.random().toString());
            const text = await response.text()
            notice.value = text.split('\n').length - 9
        }, 10000);
})

onBeforeUnmount(() => {
    clearInterval(intervalId); // Gỡ bỏ interval
});
</script>