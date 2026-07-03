import { ref } from 'vue'
import { defineStore } from 'pinia'
import instance from '@/services/http.js'
import router from '@/router'
import { useSnackbarStore } from '@/stores/snackbar.js'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const axiosInstance = instance

    const auth = ref({ name: '', email: '', role: '', uuid: '', iat: '' })
    const squads = ref([])
    const useSnackbar = useSnackbarStore()

    async function login(user) {
      try {
        const formData = new URLSearchParams()
        formData.append('username', user.email)
        formData.append('password', user.password)

        const response = await axiosInstance.post('/token', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        const data = response.data

        const token = data.access_token
        const role = data.role

        localStorage.setItem('token', token)
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + token

        auth.value = parseJwt(token)
        if (role) {
          auth.value.role = role
        }

        useSnackbar.showSnackbar({
          text: 'Bem vindo! ' + auth.value.email,
          color: 'success',
          timeout: 3000
        })

        router.push({ name: 'volunteers' })
      } catch (error) {
        if (error.response?.status === 401) {
          alert(error.response.data.detail || 'Login incorreto')
        } else {
          alert('Erro ao realizar login')
        }
      }
    }

    async function loginByToken() {
      const token = localStorage.getItem('token')

      if (!token) return

      try {
        auth.value = parseJwt(token)
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + token

        // Optional: verify token validity with backend if needed
        // await axiosInstance.get('/users/me/');
      } catch (error) {
        console.error('Invalid token', error)
        logout()
      }
    }

    function getName() {
      return auth.value.name || auth.value.email
    }

    function getUuid() {
      return auth.value.uuid
    }

    const isAdmin = () => auth.value.role === 'ADMIN'
    const isHead = () => auth.value.role === 'HEAD' || auth.value.role === 'ADMIN'
    const isMentor = () => ['ADMIN', 'HEAD', 'MENTOR'].includes(auth.value.role)

    async function logout() {
      localStorage.removeItem('token')
      axiosInstance.defaults.headers['Authorization'] = null
      $reset()
      router.push('/')
    }

    function $reset() {
      auth.value = { name: '', email: '', token: '' }
      squads.value = []
    }

    function squadReset() {
      squads.value = []
    }

    function parseJwt(token) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )

      const payload = JSON.parse(jsonPayload)
      // Map sub to email
      if (payload.sub) {
        payload.email = payload.sub
      }
      return payload
    }

    function getSquad() {
      if (squads.value.length === 0) {
        return false
      }

      return squads.value[0]
    }

    return {
      login,
      logout,
      auth,
      getName,
      getUuid,
      isAdmin,
      isHead,
      isMentor,
      $reset,
      squads,
      getSquad,
      squadReset,
      loginByToken
    }
  },
  {
    persist: true
  }
)
