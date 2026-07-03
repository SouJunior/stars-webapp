import { ref } from 'vue'
import { defineStore } from 'pinia'
import jobtitleService from '@/services/jobtitle.js'

export const useJobtitleStore = defineStore(
  'jobtitle',
  () => {
    const data = ref([])

    async function fetchJobtitles() {
      data.value = await jobtitleService.fetch()
      return data.value
    }

    return {
      fetchJobtitles,
      data
    }
  },
  {
    persist: true
  }
)
