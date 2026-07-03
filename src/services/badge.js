import http from './http'

const badgeService = {
  async create(volunteerId, badge) {
    const response = await http.post(`/volunteers/${volunteerId}/badges`, badge)
    return response.data
  },
  async getAll(volunteerId) {
    const response = await http.get(`/volunteers/${volunteerId}/badges`)
    return response.data
  },
  async delete(badgeId) {
    const response = await http.delete(`/badges/${badgeId}`)
    return response.data
  }
}

export default badgeService
