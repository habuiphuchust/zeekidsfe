<script setup>
import {  RouterLink } from 'vue-router'
import Login from '../components/login/Login.vue'
import Signup from '../components/signup/Signup.vue'
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.path);
</script>

<template>
    <div style="display: flex; justify-content: center;">
        <div class="common-layout" style="max-width: 500px; width: 100%;">
            <el-container>
                <el-header><h1 style="text-align: center;">Login</h1></el-header>
                <el-container>
                    <el-main :style="{
                        boxShadow: `var(--el-box-shadow-dark)`,
                    }">
                        <div v-if="route.path === '/login'">
                            <Login></Login>
                            <RouterLink to="/signup">Signup</RouterLink>
                        </div>
                        <div v-else>
                            <Signup></Signup>
                            <RouterLink to="/login">Login</RouterLink>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
        </div>

    </div>
</template>