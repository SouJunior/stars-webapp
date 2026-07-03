import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/services/http.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({
      name: '',
      email: ''
    })

    const registered = ref(false)

    async function register(applicant) {
      try {
        const response = await axiosInstance.post('/users/', applicant)
        const data = response.data

        if (data.error) {
          alert(data.error)
          return false
        } else {
          registered.value = true
          // localStorage.setItem('user', JSON.stringify(data)); // user data is usually set on login, not register
          return true
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            if (error.response.data.detail === 'Invalid registration code') {
              alert('O código de registro informado é inválido. Verifique com o administrador.')
            } else if (error.response.data.detail === 'Email already registered') {
              alert('E-mail já cadastrado!')
            } else {
              alert(error.response.data.detail || 'Erro ao cadastrar usuário.')
            }
          } else {
            alert(error.response.data.detail || 'Ocorreu um erro no registro.')
          }
        } else {
          alert('Erro de conexão.')
        }
        return false
      }
    }

    function setName(text) {
      user.value.name = text
    }

    const state = reactive({
      users: []
    })

    function addUser(user) {
      state.user = user
    }

    return {
      user,
      setName,
      state,
      addUser,
      register,
      registered
    }
  },
  { persist: true }
)
