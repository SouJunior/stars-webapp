import { defineStore } from 'pinia'
import dashboardService from '@/services/dashboard.js'
import { ref } from 'vue'

export const useDashboardStore = defineStore(
  'dashboard',
  () => {
    const stats = ref(null)
    const loading = ref(false)

    async function fetchStats() {
      loading.value = true
      try {
        const data = await dashboardService.fetchStats()
        stats.value = data
      } catch (error) {
        console.error('Error in dashboard store fetchStats:', error)
        // Optionally handle error state here
      } finally {
        loading.value = false
      }
    }

    return {
      stats,
      loading,
      fetchStats
    }
  }
  // { persist: true } // Persistence might not be necessary for real-time dashboard data, but can be added if needed
)
