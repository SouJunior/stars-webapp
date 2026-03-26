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

async function fetchBy(uuidSquad) {
  const response = await axiosInstance.get('/squad/' + uuidSquad + '/members', {
    headers: headers()
  })
  const data = response.data
  if (data.error) {
    throw new Error(data.error)
  } else {
    return data
  }
}

async function searchPublic(params = {}) {
  const response = await axiosInstance.get('/volunteer/search', {
    headers: headers(),
    params
  })
  return response.data
}

async function create(volunteer) {
  console.log('volunteer :', volunteer)
  const response = await axiosInstance.post('/volunteer', volunteer, { headers: headers() })
  return response.data
}

async function update(member) {
  const response = await axiosInstance.put(
    '/squad/' + member.squad_uuid + '/member/' + member.uuid,
    member,
    { headers: headers() }
  )
  const data = response.data
  if (data.error) {
    throw new Error(data.error)
  } else {
    return data
  }
}

async function del(uuidSquad, uuidMember) {
  const response = await axiosInstance.delete('/squad/' + uuidSquad + '/member/' + uuidMember, {
    headers: headers()
  })
  const data = response.data
  if (data.error) {
    throw new Error(data.error)
  } else {
    return data
  }
}

async function fetchAll(params = {}) {
  const response = await axiosInstance.get('/volunteers/', {
    headers: headers(),
    params
  })
  return response.data
}

async function getStatuses() {
  try {
    const response = await axiosInstance.get('/volunteer-statuses/', { headers: headers() })
    return response.data
  } catch (error) {
    console.error('Error fetching volunteer statuses:', error)
    throw error
  }
}

async function getVolunteerTypes() {
  try {
    const response = await axiosInstance.get('/volunteer-types/', { headers: headers() })
    return response.data
  } catch (error) {
    console.error('Error fetching volunteer types:', error)
    throw error
  }
}

async function getById(volunteerId) {
  try {
    const response = await axiosInstance.get(`/volunteers/${volunteerId}`, { headers: headers() })
    return response.data
  } catch (error) {
    console.error(`Error fetching volunteer with ID ${volunteerId}:`, error)
    throw error
  }
}

async function getPublicProfile(volunteerId) {
  try {
    // No auth headers needed for public endpoint
    const response = await axiosInstance.get(`/volunteers/${volunteerId}/public`)
    return response.data
  } catch (error) {
    console.error(`Error fetching public profile for volunteer ID ${volunteerId}:`, error)
    throw error
  }
}

async function updateStatus(volunteerId, newStatusId) {
  try {
    const response = await axiosInstance.patch(
      `/volunteers/${volunteerId}/status/`, // Added trailing slash based on user's error log
      null, // No request body as new_status_id will be a query parameter
      {
        headers: headers(),
        params: {
          // Pass new_status_id as a query parameter
          new_status_id: newStatusId
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(`Error updating status for volunteer ID ${volunteerId}:`, error)
    if (error.response) {
      console.error('Error response data:', error.response.data)
      console.error('Error response status:', error.response.status)
      console.error('Error response headers:', error.response.headers)
    }
    throw error
  }
}

async function updateSquad(volunteerId, newSquadId) {
  try {
    const response = await axiosInstance.patch(`/volunteers/${volunteerId}/squad/`, null, {
      headers: headers(),
      params: {
        new_squad_id: newSquadId
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error updating squad for volunteer ID ${volunteerId}:`, error)
    throw error
  }
}

async function updateType(volunteerId, newTypeId) {
  try {
    const response = await axiosInstance.patch(`/volunteers/${volunteerId}/type/`, null, {
      headers: headers(),
      params: {
        new_type_id: newTypeId
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error updating type for volunteer ID ${volunteerId}:`, error)
    throw error
  }
}

async function updateJobTitle(volunteerId, newJobTitleId) {
  try {
    const response = await axiosInstance.patch(`/volunteers/${volunteerId}/jobtitle/`, null, {
      headers: headers(),
      params: {
        new_jobtitle_id: newJobTitleId
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error updating job title for volunteer ID ${volunteerId}:`, error)
    throw error
  }
}

async function requestEditLink(email) {
  const response = await axiosInstance.post('/volunteers/request-edit-link', { email })
  return response.data
}

async function fetchByToken(token) {
  const response = await axiosInstance.get(`/volunteers/edit/${token}`)
  return response.data
}

async function updateProfileByToken(token, profileData) {
  const response = await axiosInstance.patch(`/volunteers/edit/${token}`, profileData)
  return response.data
}

async function checkApoiaseStatus(volunteerId) {
  try {
    const response = await axiosInstance.post(`/volunteers/${volunteerId}/check-apoiase`, null, {
      headers: headers()
    })
    return response.data
  } catch (error) {
    console.error(`Error checking APOIA.se status for volunteer ID ${volunteerId}:`, error)
    throw error
  }
}

async function addMentee(mentorId, menteeId) {
  try {
    const response = await axiosInstance.post(`/volunteers/${mentorId}/mentees/${menteeId}`, null, {
      headers: headers()
    })
    return response.data
  } catch (error) {
    console.error(`Error adding mentee ${menteeId} to mentor ${mentorId}:`, error)
    throw error
  }
}

async function removeMentee(mentorId, menteeId) {
  try {
    const response = await axiosInstance.delete(`/volunteers/${mentorId}/mentees/${menteeId}`, {
      headers: headers()
    })
    return response.data
  } catch (error) {
    console.error(`Error removing mentee ${menteeId} from mentor ${mentorId}:`, error)
    throw error
  }
}

export default {
  fetchBy,
  del,
  create,
  update,
  searchPublic,
  fetchAll,
  getStatuses,
  getVolunteerTypes,
  getById,
  updateStatus,
  updateSquad,
  updateType,
  requestEditLink,
  fetchByToken,
  updateProfileByToken,
  getPublicProfile,
  checkApoiaseStatus,
  addMentee,
  removeMentee,
  updateJobTitle
}
