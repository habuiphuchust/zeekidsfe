<template>
    <el-tabs type="border-card">
        <el-tab-pane label="Parameter Configuration" lazy>
            <Config></Config>
        </el-tab-pane>
        <el-tab-pane label="Loaded Script" lazy>
            <LoadScript></LoadScript>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import Config from './config/Config.vue'
import LoadScript from './config/LoadScript.vue'
</script>