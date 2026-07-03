import { ref } from 'vue'
import { defineStore } from 'pinia'
import volunteerTypeService from '@/services/volunteerType.js'

export const useVolunteerTypeStore = defineStore(
  'volunteerType',
  () => {
    const data = ref([])

    async function fetchVolunteerTypes() {
      data.value = await volunteerTypeService.fetch()
      return data.value
    }

    return {
      fetchVolunteerTypes,
      data
    }
  },
  {
    persist: true
  }
)
