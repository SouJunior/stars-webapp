import instance from './http'

export default {
  getUsers(skip = 0, limit = 100) {
    return instance.get(`/users/?skip=${skip}&limit=${limit}`)
  },
  getUser(id) {
    return instance.get(`/users/${id}`)
  },
  updateRole(id, role) {
    return instance.patch(`/users/${id}/role?role=${role}`)
  },
  requestPasswordReset(email) {
    return instance.post('/request-password-reset', { email })
  },
  resetPassword(token, new_password) {
    return instance.post('/reset-password', { token, new_password })
  }
}
