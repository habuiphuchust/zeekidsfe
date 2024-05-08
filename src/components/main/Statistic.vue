<template>
  <div>
    <el-row>
      <el-col :span="24">
        <Connection></Connection>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <Modbus></Modbus>
      </el-col>
      <el-col :span="12">
        <Notice></Notice>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Modbus from "./statistic/Modbus.vue"
import Connection from "./statistic/Connection.vue"
import Notice from "./statistic/Notice.vue"

</script>