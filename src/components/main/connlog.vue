<template>
  <Table :columns="columns" :data="data"></Table>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue'
import Table from './Table.vue';
import get from '@/api/get';

let columns = ref([])
let data = ref([])


onMounted(async () => {
    const response = await get('http://localhost:8080/api/conn.log');
    const text = await response.text()
    if (!text) return;
    const dt = text.split('\n');
    const field = dt[6].split('\t');
    field.shift();
    columns.value = field.map((a, i) => ({
      key: `${a}`,
      dataKey: `${a}`,
      title: `${a}`,
      width: 150,
    }))
    console.log(dt[dt.length - 3])

    data.value = Array.from({ length: 1000 }).map((_, rowIndex) => {
      return columns.value.reduce(
        (rowData, column, columnIndex) => {
          rowData[column.dataKey] = dt[dt.length - rowIndex - 3].split('\t')[columnIndex]
          return rowData
        },
        {
          id: `${rowIndex}`,
          parentId: null,
        }
      )
    })
})
</script>