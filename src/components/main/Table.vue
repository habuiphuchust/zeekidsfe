<template>
    <div style="height: 400px">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed />
            </template>
        </el-auto-resizer>
    </div>
</template>

<script setup>
const props = defineProps(['data', 'columns'])
</script>