<template>
    <el-link type="primary" @click="back()"><el-icon :size="40">
            <Back />
        </el-icon></el-link>

    <br>
    <el-link type="primary">/ {{ currentDir }}</el-link>
    <el-link type="success" @click="dialogTableVisible2 = true"><el-icon :size="20">
            <DocumentAdd />
        </el-icon> Add file</el-link>
    <el-link type="success" @click="dialogTableVisible3 = true"><el-icon :size="20">
            <FolderAdd />
        </el-icon> Add folder</el-link>

    <p v-for="file in listFiles">
    <div v-if="file.type === 'file'">
        <el-link type="danger" @click="deleteFile(file.path)"><el-icon size="20">
                <Delete />
            </el-icon></el-link>
        <el-link @click="openFile(file.path)">
            <p><el-icon>
                    <Document />
                </el-icon> {{ file.name }}</p>
        </el-link>
    </div>
    <div v-if="file.type === 'directory'">
        <el-link type="danger" @click="deleteDir(file.path)"><el-icon size="20">
                <Delete />
            </el-icon></el-link>
        <el-link @click="openDir(file.path)">
            <p><el-icon>
                    <Folder />
                </el-icon> {{ file.name }}</p>
        </el-link>
    </div>
    </p>

    <el-dialog v-model="dialogTableVisible" title="File">
        <LoadScript :fileName="currentFile" :key="key" @close="dialogTableVisible = false"></LoadScript>
    </el-dialog>

    <el-dialog v-model="dialogTableVisible2" title="Add file">
        <el-form-item label="file name">
            <el-input v-model="newFileName" placeholder="extention .zeek" />
        </el-form-item> <el-form-item label="file content">
            <el-input v-model="newFileContent" placeholder="content of file" type="textarea"
                :autosize="{ minRows: 10, maxRows: 16 }" />
        </el-form-item>
        <el-button type="primary" @click="Save()">
            Submit
        </el-button>
    </el-dialog>
    <el-dialog v-model="dialogTableVisible3" title="Add folder">
        <el-form-item label="folder name">
            <el-input v-model="newDirName" placeholder="input folder name" />
        </el-form-item>
        <el-button type="primary" @click="saveFolder()">
            Submit
        </el-button>
    </el-dialog>

</template>

<script setup>
// import Config from './config/Config.vue'
import LoadScript from './config/LoadScript.vue'
import get from '@/api/get';
import post from '@/api/post';
import constants from '@/until/constants';
import { ref, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    Document, DocumentAdd,
    Folder, FolderAdd,
    Back, Delete,
} from '@element-plus/icons-vue'

const dialogTableVisible = ref(false)
const dialogTableVisible2 = ref(false)
const dialogTableVisible3 = ref(false)



const dirStack = ref([])
const listFiles = ref([])
const currentDir = ref('')
const currentFile = ref('')
const key = ref(0)

const newFileName = ref('')
const newFileContent = ref('')
const newDirName = ref('')

onMounted(upDate)
async function upDate() {
    let res = await get(constants.api.configDir + '?path=' + currentDir.value);
    if (!res.ok) return;
    listFiles.value = await res.json();
}
watch(currentDir, async () => {
    let res = await get(constants.api.configDir + '?path=' + currentDir.value);
    if (!res.ok) return;
    listFiles.value = await res.json();
    dirStack.value.push(currentDir.value)
})

function openDir(path) {
    currentDir.value = path
}
function openFile(path) {
    currentFile.value = path
    key.value++
    dialogTableVisible.value = true;
}
function deleteDir(path) {
    ElMessageBox.confirm(
        'Do you want to delete the folder ?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            let response = await get(constants.api.configDir + '/delete?path=' + path)
            if (!response.ok) {
                let message = await response.text()
                ElMessage({
                    type: 'error',
                    message
                })
                return
            }
            upDate()
            ElMessage({
                type: 'success',
                message: 'success',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'canceled',
            })
        })
}
function deleteFile(path) {
    ElMessageBox.confirm(
        'Do you want to delete the file ?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            let response = await get(constants.api.configFile + '/delete?path=' + path)
            if (!response.ok) {
                let message = await response.text()
                ElMessage({
                    type: 'error',
                    message
                })
                return
            }
            upDate()
            ElMessage({
                type: 'success',
                message: 'success',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'canceled',
            })
        })
}
function back() {
    dirStack.value.pop()
    if (dirStack.value.length === 0)
        currentDir.value = ''
    else
        currentDir.value = dirStack.value.slice(-1)[0]

}
function Save() {
    ElMessageBox.confirm(
        'Do you want add the file ?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            let response = await post(constants.api.configFile + '?path=' + currentDir.value + '/' + newFileName.value, newFileContent.value)
            if (!response.ok) {
                let message = await response.text()
                ElMessage({
                    type: 'error',
                    message
                })
                return
            }
            dialogTableVisible2.value = false
            newFileName.value = ''
            newFileContent.value = ''
            upDate()
            ElMessage({
                type: 'success',
                message: 'success',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'canceled',
            })
        })
}
function saveFolder() {
    ElMessageBox.confirm(
        'Do you want add the folder ?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            let response = await post(constants.api.configDir + '?path=' + currentDir.value + '/' + newDirName.value, "")
            if (!response.ok) {
                let message = await response.text()
                ElMessage({
                    type: 'error',
                    message
                })
                return
            }
            dialogTableVisible3.value = false
            newDirName.value = ''
            upDate()
            ElMessage({
                type: 'success',
                message: 'success',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'canceled',
            })
        })
}

</script>