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
    const response = await axiosInstance.get('/squads/', { headers: headers() })

    const data = response.data

    if (data.error) {
      alert(data.error)
      return
    } else {
      return data
    }
  } catch (error) {
    alert(error)
    return []
  }
}

async function fetchBy(uuid) {
  try {
    const response = await axiosInstance.get('/squads/' + uuid, { headers: headers() })

    const data = response.data

    if (data.error) {
      alert(data.error)
      return
    } else {
      return data
    }
  } catch (error) {
    alert(error)
  }
}

async function post(squad) {
  try {
    const response = await axiosInstance.post('/squads/', squad, { headers: headers() })

    const data = response.data

    if (data.error) {
      alert(data.error)
      return
    } else {
      return data
    }
  } catch (error) {
    alert(error)
  }
}

async function put(squad) {
  try {
    const response = await axiosInstance.put('/squad/' + squad.uuid, squad, { headers: headers() })

    const data = response.data

    if (data.error) {
      alert(data.error)
      return
    } else {
      return data
    }
  } catch (error) {
    alert(error)
  }
}

async function del(uuid) {
  try {
    const response = await axiosInstance.delete('/squad/' + uuid, { headers: headers() })

    const data = response.data

    if (data.error) {
      alert(data.error)
      return
    } else {
      return data
    }
  } catch (error) {
    alert(error)
  }
}

export default {
  fetchAll,
  fetchBy,
  post,
  del,
  put
}
