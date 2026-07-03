import { defineStore } from 'pinia'
import volunteerService from '@/services/volunteer.js'
import { ref } from 'vue'

export const useVolunteerStore = defineStore(
  'volunteer',
  () => {
    const currentVolunteer = ref(null) // Used for single volunteer details
    const volunteers = ref([]) // New ref for list of volunteers
    const foundVolunteers = ref([]) // For public search results
    const statuses = ref([]) // To store all available statuses
    const loading = ref(false) // Add loading state

    async function searchPublic(params) {
      try {
        foundVolunteers.value = await volunteerService.searchPublic(params)
        // Optionally clear currentVolunteer or leave it?
        // Better to use foundVolunteers in the search view.
      } catch (error) {
        console.error('Erro ao buscar voluntários (público):', error)
        foundVolunteers.value = [] // Clear on error
        let errorMessage = 'Erro ao buscar voluntários.'
        if (error.response && error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail
        } else if (error.message) {
          errorMessage = error.message
        }
        throw new Error(errorMessage)
      }
    }

    async function create(volunteer) {
      console.log('store volunteer :', volunteer)
      try {
        const data = await volunteerService.create(volunteer)

        if (data && data.error) {
          throw new Error(data.error)
        }
        return data
      } catch (error) {
        let errorMessage = 'Um erro inesperado ocorreu.' // Default message

        if (error.response && error.response.data && error.response.data.detail) {
          const backendDetail = error.response.data.detail
          if (backendDetail === 'Email already registered') {
            errorMessage = 'E-mail já registrado.'
          } else {
            errorMessage = backendDetail // Use the backend message if not a known one
          }
        } else if (error.message) {
          errorMessage = error.message // Fallback to generic JS error message
        }

        throw new Error(errorMessage)
      }
    }

    async function fetchAll(page = 1, limit = 10, filters = {}) {
      loading.value = true // Set loading to true
      try {
        const skip = (page - 1) * limit
        const params = { skip, limit, ...filters }
        const response = await volunteerService.fetchAll(params)
        volunteers.value = response
      } catch (error) {
        console.error('Erro ao buscar voluntários:', error)
        let errorMessage = 'Erro ao buscar voluntários.'
        if (error.response && error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail
        } else if (error.message) {
          errorMessage = error.message
        }
        throw new Error(errorMessage)
      } finally {
        loading.value = false // Set loading to false regardless of success or failure
      }
    }

    async function fetchStatuses() {
      try {
        statuses.value = await volunteerService.getStatuses()
      } catch (error) {
        console.error('Erro ao buscar status de voluntários:', error)
        let errorMessage = 'Erro ao buscar status de voluntários.'
        if (error.response && error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail
        } else if (error.message) {
          errorMessage = error.message
        }
        throw new Error(errorMessage)
      }
    }

    async function fetchVolunteer(id) {
      try {
        currentVolunteer.value = await volunteerService.getById(id)
      } catch (error) {
        console.error(`Erro ao buscar voluntário ${id}:`, error)
        let errorMessage = `Erro ao buscar voluntário ${id}.`
        if (error.response && error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail
        } else if (error.message) {
          errorMessage = error.message
        }
        throw new Error(errorMessage)
      }
    }

    async function updateVolunteerStatus(volunteerId, newStatusId) {
      try {
        await volunteerService.updateStatus(volunteerId, newStatusId)
        // After successful update, refetch the volunteer to get the updated status and history
        await fetchVolunteer(volunteerId)
      } catch (error) {
        console.error(`Erro ao atualizar status do voluntário ${volunteerId}:`, error)
        let errorMessage = `Erro ao atualizar status do voluntário ${volunteerId}.`
        if (error.response && error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail
        } else if (error.message) {
          errorMessage = error.message
        }
        throw new Error(errorMessage)
      }
    }

    async function updateVolunteerSquad(volunteerId, newSquadId) {
      try {
        await volunteerService.updateSquad(volunteerId, newSquadId)
        await fetchVolunteer(volunteerId)
      } catch (error) {
        console.error(`Erro ao atualizar squad do voluntário ${volunteerId}:`, error)
        let errorMessage = `Erro ao atualizar squad do voluntário ${volunteerId}.`
        if (error.response && error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail
        } else if (error.message) {
          errorMessage = error.message
        }
        throw new Error(errorMessage)
      }
    }

    async function updateVolunteerType(volunteerId, newTypeId) {
      try {
        await volunteerService.updateType(volunteerId, newTypeId)
        // Check if we are updating the current volunteer (logged in user)
        if (currentVolunteer.value && currentVolunteer.value.id === volunteerId) {
             // We can either fetch again or just update the local state if we trust the backend
             // Let's fetch to be safe and get related objects if needed
             await fetchByEmail(currentVolunteer.value.email)
        } else {
             // If it's another volunteer (admin view), fetch that specific one
             await fetchVolunteer(volunteerId)
        }
      } catch (error) {
        console.error(`Erro ao atualizar tipo do voluntário ${volunteerId}:`, error)
        let errorMessage = `Erro ao atualizar tipo do voluntário ${volunteerId}.`
        if (error.response && error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail
        } else if (error.message) {
          errorMessage = error.message
        }
        throw new Error(errorMessage)
      }
    }

    async function updateVolunteerJobTitle(volunteerId, newJobTitleId) {
      try {
        await volunteerService.updateJobTitle(volunteerId, newJobTitleId)
        await fetchVolunteer(volunteerId)
      } catch (error) {
        console.error(`Erro ao atualizar cargo do voluntário ${volunteerId}:`, error)
        let errorMessage = `Erro ao atualizar cargo do voluntário ${volunteerId}.`
        if (error.response && error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail
        } else if (error.message) {
          errorMessage = error.message
        }
        throw new Error(errorMessage)
      }
    }

    async function checkApoiaseStatus(volunteerId) {
      try {
        const updatedVolunteer = await volunteerService.checkApoiaseStatus(volunteerId)
        // Update current volunteer
        if (currentVolunteer.value && currentVolunteer.value.id === volunteerId) {
          currentVolunteer.value = updatedVolunteer
        }
        return updatedVolunteer
      } catch (error) {
        console.error(`Erro ao verificar status APOIA.se do voluntário ${volunteerId}:`, error)
        let errorMessage = `Erro ao verificar status APOIA.se.`
        if (error.response && error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail
        } else if (error.message) {
          errorMessage = error.message
        }
        throw new Error(errorMessage)
      }
    }

    async function fetchByEmail(email) {
      try {
        const response = await volunteerService.fetchAll({ email: email })
        // API does partial match, so filter for exact match
        const match = response.find((v) => v.email === email)
        currentVolunteer.value = match || null
        return match
      } catch (error) {
        console.error(`Erro ao buscar voluntário por email ${email}:`, error)
        throw error
      }
    }

    async function addMentee(mentorId, menteeId) {
      try {
        const data = await volunteerService.addMentee(mentorId, menteeId)
        return data
      } catch (error) {
        console.error(`Erro ao adicionar mentorado:`, error)
        throw error
      }
    }

    async function removeMentee(mentorId, menteeId) {
      try {
        const data = await volunteerService.removeMentee(mentorId, menteeId)
        return data
      } catch (error) {
        console.error(`Erro ao remover mentorado:`, error)
        throw error
      }
    }

    return {
      currentVolunteer,
      volunteers,
      foundVolunteers,
      statuses,
      loading, // Expose loading state
      fetchAll,
      create,
      searchPublic,
      fetchStatuses,
      fetchVolunteer,
      updateVolunteerStatus,
      updateVolunteerSquad,
      updateVolunteerType,
      updateVolunteerJobTitle,
      checkApoiaseStatus,
      fetchByEmail,
      addMentee,
      removeMentee
    }
  },
  {
    persist: true
  }
)
