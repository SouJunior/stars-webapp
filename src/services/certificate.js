import axiosInstance from '@/services/http.js'

function headers() {
  const token = localStorage.getItem('token')

  const h = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  if (token) {
    h.Authorization = 'Bearer ' + token
  }

  return h
}

async function create(volunteerId, certificate) {
  const response = await axiosInstance.post(`/volunteers/${volunteerId}/certificates`, certificate, { headers: headers() })
  return response.data
}

async function get(certificateId) {
  const response = await axiosInstance.get(`/certificates/${certificateId}`, { headers: headers() })
  return response.data
}

async function getForVolunteer(volunteerId) {
    const response = await axiosInstance.get(`/volunteers/${volunteerId}/certificates`, { headers: headers() })
    return response.data
}

async function cancel(certificateId) {
  const response = await axiosInstance.patch(`/certificates/${certificateId}/cancel`, null, { headers: headers() })
  return response.data
}

export default {
  create,
  get,
  getForVolunteer,
  cancel
}
