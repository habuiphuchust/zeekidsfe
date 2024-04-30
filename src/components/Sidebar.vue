<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
        text-color="#fff" @open="handleOpen" @close="handleClose">
        <el-menu-item index="1" @click="onClick('1')">
            <el-icon><icon-menu /></el-icon>
            <span>Log</span>
        </el-menu-item>
        <el-menu-item index="2" @click="onClick('2')">
            <el-icon><icon-menu /></el-icon>
            <span>Config</span>
        </el-menu-item>
        <el-menu-item index="3" @click="onClick('3')">
            <el-icon>
                <document />
            </el-icon>
            <span>Statistic</span>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <setting />
            </el-icon>
            <span>Setting</span>
        </el-menu-item>
    </el-menu>

</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { useRouter} from 'vue-router'

const router = useRouter()

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

function onClick(key:string) {
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
        default:
            break;
    }
    
}
</script>