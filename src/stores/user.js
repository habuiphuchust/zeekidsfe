import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const token = ref("")
    const username = ref("")
    const fullName = ref("")
    const role = ref([])
    const isLogin = ref(false)
    const backUrl = ref('/')


    function setToken(newToken) {
        token.value = newToken
    }

    function setUsername(newUsername) {
        username.value = newUsername
    }

    function setFullName(newFullName) {
        fullName.value = newFullName
    }

    function setRole(newRole) {
        role.value = newRole
    }

    function setIsLogin(newIsLogin) {
        isLogin.value = newIsLogin
    }

    function setBackUrl(newBackUrl) {
        backUrl.value = newBackUrl
    }

    return {
        token, username, fullName, isLogin, role, backUrl,
        setFullName, setToken, setUsername, setIsLogin, setRole, setBackUrl
    }
})
