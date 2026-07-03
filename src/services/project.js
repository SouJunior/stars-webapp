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

async function fetchAll() {
  try {
    const response = await axiosInstance.get('/projects/', { headers: headers() })

    const data = response.data

    if (data.error) {
      alert(data.error)
      return
    } else {
      return data
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

async function fetchBy(id) {
  try {
    const response = await axiosInstance.get('/projects/' + id, { headers: headers() })

    const data = response.data

    if (data.error) {
      alert(data.error)
      return
    } else {
      return data
    }
  } catch (error) {
    console.error(error)
  }
}

async function post(project) {
  try {
    const response = await axiosInstance.post('/projects/', project, { headers: headers() })

    const data = response.data

    if (data.error) {
      alert(data.error)
      return
    } else {
      return data
    }
  } catch (error) {
    console.error(error)
    throw error // Re-throw to handle in component
  }
}

async function del(id) {
  try {
    const response = await axiosInstance.delete('/projects/' + id, { headers: headers() })

    const data = response.data

    if (data.error) {
      alert(data.error)
      return
    } else {
      return data
    }
  } catch (error) {
    console.error(error)
  }
}

export default {
  fetchAll,
  fetchBy,
  post,
  del
}
