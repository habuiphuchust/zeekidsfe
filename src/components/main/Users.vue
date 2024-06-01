<template>
    <el-button type="primary" round @click="dialogTableVisible = true">Add</el-button>

    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="User name" prop="username" />
        <el-table-column label="Role" prop="roles" />
        <el-table-column label="Name" prop="fullname" />
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                    Change Password
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    Delete
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogTableVisible" title="Add user" width="400">
        <el-form-item label="username">
            <el-input v-model="username" placeholder="4-20 character" />
        </el-form-item>
        <el-form-item label="full name">
            <el-input v-model="fullname" placeholder="name of user" />
        </el-form-item>
        <el-form-item label="password">
            <el-input v-model="password" placeholder="not blank" />
        </el-form-item>
        <el-button type="primary" @click="addUser">
            Submit
        </el-button>
    </el-dialog>
    <el-dialog v-model="dialogTableVisible2" title="Change Password" width="400">
        <el-form-item label="new password">
            <el-input v-model="newPassword" placeholder="not blank" />
        </el-form-item>
        <el-button type="primary" @click="changePassword">
            Submit
        </el-button>
    </el-dialog>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import get from '@/api/get';
import constants from '@/until/constants';
import post from '@/api/post';
import { ElMessage, ElMessageBox } from 'element-plus'


const dialogTableVisible = ref(false)
const dialogTableVisible2 = ref(false)



const search = ref('')
const tableData = ref([])
const username = ref('')
const password = ref('')
const fullname = ref('')
const oldUser = ref('')
const newPassword = ref('')


const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.username.toLowerCase().includes(search.value.toLowerCase()) ||
            data.fullname.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index, row) => {
    console.log(index, row)
    dialogTableVisible2.value = true;
    oldUser.value = row.username;
}
const handleDelete = (index, row) => {
    console.log(index, row)
    ElMessageBox.confirm(
        `Are you want delete user ${row.username} ?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            const response = await get(constants.api.deleteUser + row.username)
            const text = await response.text()
            if (response.ok) {
                ElMessage({
                    type: 'success',
                    message: text,
                })
                upDate()
                dialogTableVisible.value = false
            } else {
                ElMessage({
                    type: 'error',
                    message: "fail to delete user",
                })
                dialogTableVisible.value = false
            }

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'canceled',
            })
            dialogTableVisible.value = false
        })
}

onMounted(upDate)

async function upDate() {
    const response = await get(constants.api.users);
    if (response.ok) {
        let data = await response.json()
        tableData.value = data
    }
}

async function addUser() {
    let user = { username: username.value, fullname: fullname.value, password: password.value }
    const response = await post(constants.api.register, JSON.stringify(user))
    const text = await response.text()
    if (response.ok) {
        ElMessage({
            type: 'success',
            message: text,
        })
        upDate()
        dialogTableVisible.value = false
    } else {
        ElMessage({
            type: 'error',
            message: 'fail to add user',
        })
        dialogTableVisible.value = false
    }
}

async function changePassword() {
    ElMessageBox.confirm(
        `Are you want change password of user ${oldUser.value} ?`,
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            const response = await post(constants.api.changePassword, JSON.stringify({ username: oldUser.value, newPassword: newPassword.value }))
            const text = await response.text()
            if (response.ok) {
                ElMessage({
                    type: 'success',
                    message: text,
                })
                upDate()
                dialogTableVisible2.value = false
            } else {
                ElMessage({
                    type: 'error',
                    message: "fail to change password",
                })
                dialogTableVisible2.value = false
            }

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'canceled',
            })
            dialogTableVisible2.value = false
        })
}

</script>