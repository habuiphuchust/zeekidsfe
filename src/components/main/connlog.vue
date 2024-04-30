<template>
  <el-button type="primary" round @click="upDate">Cập nhật</el-button>

  <el-input v-model="search" style="width: 50%; margin-left: 50%; margin-top: -6rem;" size="small"
    placeholder="Type to search" />
  <Table :columns="columns" :data="data" style="margin-top: -3rem;"></Table>
  <el-pagination :page-size="pageSize" :pager-count="7" layout="prev, pager, next" :total="totalElement"
    @current-change="val => getPage(val)" />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import Table from './Table.vue';
import get from '@/api/get';
import parseLog from '@/until/parseLog';
import constants from '@/until/constants';

let columns = ref([])
let data = ref([])
const search = ref('')
const filter = ref([])
const rows = ref([]);
const fields = ref([])
const pageSize = ref(200)
const currentPage = ref(1)
const totalElement = ref(0);

onMounted(upDate)


watch(search, async () => {
  let keyword = search.value.split('&&');
  filter.value = rows.value.filter((value: String) => {
    for (let i = 0; i < keyword.length; i++) {
      if (!value.includes(keyword[i].trim())) return false;
    }
    return true;
  })
  totalElement.value = filter.value.length
  data.value = parseLog.GetData(fields.value, filter.value, pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
})

function getPage(curPage) {
  currentPage.value = curPage
  data.value = parseLog.GetData(fields.value, filter.value, pageSize.value * (curPage - 1), pageSize.value * curPage);
}

async function upDate() {
  const response = await get(constants.api.connlog + "?x=" + Math.random().toString());
  const text = await response.text()
  if (!text) return;
  let parse = parseLog.Parse(text);
  rows.value = parse.rows
  fields.value = parse.fields
  filter.value = parse.rows

  columns.value = fields.value

  totalElement.value = rows.value.length
  data.value = parseLog.GetData(fields.value, rows.value, pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
}
</script>