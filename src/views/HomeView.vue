<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Topbar></Topbar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Sidebar></Sidebar>
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Topbar from '@/components/Topbar.vue';
import Sidebar from '@/components/Sidebar.vue';
</script>
