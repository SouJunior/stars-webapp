import { ref } from 'vue'
import { defineStore } from 'pinia'
import verticalService from '@/services/vertical.js'

export const useVerticalStore = defineStore(
  'vertical',
  () => {
    const data = ref([])

    async function fetchVerticals() {
      try {
        data.value = await verticalService.fetch()
        return data.value
      } catch (error) {
        console.error('Error fetching verticals:', error)
        return []
      }
    }

    async function getVertical(id) {
      try {
        return await verticalService.getById(id)
      } catch (error) {
        console.error('Error fetching vertical:', error)
        throw error
      }
    }

    async function createVertical(vertical) {
      try {
        const newVertical = await verticalService.create(vertical)
        data.value.push(newVertical)
        return newVertical
      } catch (error) {
        console.error('Error creating vertical:', error)
        throw error
      }
    }

    async function updateVertical(id, vertical) {
      try {
        const updated = await verticalService.update(id, vertical)
        const index = data.value.findIndex((v) => v.id === id)
        if (index !== -1) {
          data.value[index] = updated
        }
        return updated
      } catch (error) {
        console.error('Error updating vertical:', error)
        throw error
      }
    }

    async function deleteVertical(id) {
      try {
        await verticalService.remove(id)
        data.value = data.value.filter((v) => v.id !== id)
      } catch (error) {
        console.error('Error deleting vertical:', error)
        throw error
      }
    }

    async function updateVolunteerVerticals(volunteerId, verticalIds) {
      try {
        return await verticalService.updateVolunteerVerticals(volunteerId, verticalIds)
      } catch (error) {
        console.error('Error updating volunteer verticals:', error)
        throw error
      }
    }

    return {
      data,
      fetchVerticals,
      getVertical,
      createVertical,
      updateVertical,
      deleteVertical,
      updateVolunteerVerticals
    }
  },
  {
    persist: true
  }
)
