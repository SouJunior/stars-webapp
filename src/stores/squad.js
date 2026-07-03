import { defineStore } from 'pinia'
import squadService from '@/services/squad.js'
import { ref } from 'vue'
import { useAuthStore } from './auth.js'

export const useSquadStore = defineStore(
  'squad',
  () => {
    const squad = ref([])
    const squads = ref([])
    const useAuth = useAuthStore()

    async function fetchAllSquads() {
      try {
        const data = await squadService.fetchAll()
        squads.value = data
      } catch (error) {
        console.error(error)
      }
    }

    async function fetch(uuid) {
      try {
        const data = await squadService.fetchBy(uuid)

        if (data.error) {
          alert(data.error)
          return
        } else if (data.message) {
          alert(data.message)
        } else {
          squad.value = data
        }
      } catch (error) {
        alert(error)
      }
    }

    async function create(squad) {
      try {
        const data = await squadService.post(squad)

        if (data.error) {
          alert(data.error)
          return
        } else if (data.message) {
          // alert(data.message)
          // await fetch()
          // await useAuth.fetchSquads(squad.product_uuid)
        } else {
          squad.value = data
        }
      } catch (error) {
        alert(error)
      }
    }

    async function update(squad) {
      try {
        const data = await squadService.put(squad)

        if (data.error) {
          alert(data.error)
          return
        } else if (data.message) {
          // alert(data.message)
          // await fetch()
          // await useAuth.fetchSquads(squad.product_uuid)
          return data
        } else {
          squad.value = data
        }
      } catch (error) {
        alert(error)
      }
    }

    async function del(uuid) {
      console.log('store :', uuid)
      try {
        const data = await squadService.del(uuid)

        if (data.error) {
          alert(data.error)
          return
        } else if (data.message) {
          // alert(data.message)
          // await fetch()
          await useAuth.squadReset()
        }
      } catch (error) {
        alert(error)
      }
    }

    return {
      squad,
      squads,
      fetch,
      fetchAllSquads,
      create,
      del,
      update
    }
  },
  {
    persist: true
  }
)
