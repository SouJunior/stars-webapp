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

async function fetch() {
  try {
    const response = await axiosInstance.get('/verticals/', { headers: headers() })

    const data = response.data

    if (data.error) {
      alert(data.error)
      return
    } else if (data.message) {
      alert(data.message)
    } else {
      return data
    }
  } catch (error) {
    console.error('Error fetching verticals:', error)
    throw error
  }
}

async function getById(id) {
  try {
    const response = await axiosInstance.get(`/verticals/${id}`, { headers: headers() })
    return response.data
  } catch (error) {
    console.error(`Error fetching vertical ${id}:`, error)
    throw error
  }
}

async function create(vertical) {
  try {
    const response = await axiosInstance.post('/verticals/', vertical, { headers: headers() })
    return response.data
  } catch (error) {
    console.error('Error creating vertical:', error)
    throw error
  }
}

async function update(id, vertical) {
  try {
    const response = await axiosInstance.put(`/verticals/${id}`, vertical, { headers: headers() })
    return response.data
  } catch (error) {
    console.error('Error updating vertical:', error)
    throw error
  }
}

async function remove(id) {
  try {
    const response = await axiosInstance.delete(`/verticals/${id}`, { headers: headers() })
    return response.data
  } catch (error) {
    console.error('Error deleting vertical:', error)
    throw error
  }
}

async function updateVolunteerVerticals(volunteerId, verticalIds) {
  try {
    const response = await axiosInstance.patch(
      `/volunteers/${volunteerId}/verticals/`,
      verticalIds,
      { headers: headers() }
    )
    return response.data
  } catch (error) {
    console.error('Error updating volunteer verticals:', error)
    throw error
  }
}

export default {
  fetch,
  getById,
  create,
  update,
  remove,
  updateVolunteerVerticals
}
