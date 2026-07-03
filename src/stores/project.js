import { defineStore } from 'pinia'
import projectService from '@/services/project.js'
import { ref } from 'vue'

export const useProjectStore = defineStore('project', () => {
  const projects = ref([])
  const project = ref(null)
  const loading = ref(false)

  async function fetchAllProjects() {
    loading.value = true
    try {
      const data = await projectService.fetchAll()
      projects.value = data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function fetchProject(id) {
    loading.value = true
    try {
      const data = await projectService.fetchBy(id)
      project.value = data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function create(newProject) {
    loading.value = true
    try {
      await projectService.post(newProject)
      // Optionally refetch or append
      await fetchAllProjects()
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      loading.value = false
    }
  }

  async function del(id) {
    loading.value = true
    try {
      await projectService.del(id)
      await fetchAllProjects()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    project,
    loading,
    fetchAllProjects,
    fetchProject,
    create,
    del
  }
})
