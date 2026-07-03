import http from './http'

const feedbackService = {
  async create(volunteerId, feedback) {
    const response = await http.post(`/volunteers/${volunteerId}/feedbacks`, feedback)
    return response.data
  },
  async getAll(volunteerId) {
    const response = await http.get(`/volunteers/${volunteerId}/feedbacks`)
    return response.data
  },
  async update(feedbackId, feedback) {
    const response = await http.put(`/feedbacks/${feedbackId}`, feedback)
    return response.data
  },
  async delete(feedbackId) {
    const response = await http.delete(`/feedbacks/${feedbackId}`)
    return response.data
  }
}

export default feedbackService
