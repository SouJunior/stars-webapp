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

async function fetchStats() {
  try {
    const response = await axiosInstance.get('/dashboard/stats', { headers: headers() })

    return response.data
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw error
  }
}

export default {
  fetchStats
}
