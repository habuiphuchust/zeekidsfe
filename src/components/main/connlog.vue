<template>
    <div style="height: 400px">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="columns"
            :data="data"
            :width="width"
            :height="height"
            fixed
          />
        </template>
      </el-auto-resizer>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref, onMounted, watch } from 'vue'

  const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
    Array.from({ length }).map((_, columnIndex) => ({
      ...props,
      key: `${prefix}${columnIndex}`,
      dataKey: `${prefix}${columnIndex}`,
      title: `Column ${columnIndex}`,
      width: 150,
    }))
  
  const generateData = (
    columns: ReturnType<typeof generateColumns>,
    length = 200,
    prefix = 'row-'
  ) =>
    Array.from({ length }).map((_, rowIndex) => {
      return columns.reduce(
        (rowData, column, columnIndex) => {
          rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
          return rowData
        },
        {
          id: `${prefix}${rowIndex}`,
          parentId: null,
        }
      )
    })
  
  let columns = ref([])
  let data = ref([])


onMounted(() => {

  fetch('http://localhost:8080/api/conn.log', {
    method: 'GET'
  }).then(response => {
    if(response.ok) return response.text()
  }).then(text => {
    const dt = text.split('\n');
    const field = dt[6].split('\t');
    field.shift();
    columns.value = field.map((a, i) => ({
      key: `${a}`,
      dataKey: `${a}`,
      title: `${a}`,
      width: 150,
    }))
    console.log(dt[dt.length-3])

    // data.value = [columns.value.reduce(
    //     (rowData, column, columnIndex) => {
    //       rowData[column.dataKey] = dt[8].split('\t')[columnIndex]
    //       return rowData
    //     },
    //     {
    //       id: `1`,
    //       parentId: null,
    //     }
    //   )]
    // console.log(data);
    data.value= Array.from({ length: 10000 }).map((_, rowIndex) => {
      return columns.value.reduce(
        (rowData, column, columnIndex) => {
          rowData[column.dataKey] = dt[dt.length-rowIndex-3].split('\t')[columnIndex]
          return rowData
        },
        {
          id: `${rowIndex}`,
          parentId: null,
        }
      )
    })


  }).catch(err => {
    console.log(err)
  })
})
  </script>
  