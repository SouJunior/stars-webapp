import http from './http'

export const createJob = (job) => http.post('/jobs/', job, { timeout: 60000 })

export const getJobs = (params) => http.get('/jobs/', { params, timeout: 60000 })

export const getJob = (id) => http.get(`/jobs/${id}`, { timeout: 60000 })

export const updateJob = (id, job) => http.put(`/jobs/${id}`, job, { timeout: 60000 })

export const deleteJob = (id) => http.delete(`/jobs/${id}`, { timeout: 60000 })

export const applyForJob = (jobId, email) =>
  http.post('/jobs/apply', null, { params: { job_id: jobId, email }, timeout: 60000 })

export const getJobApplications = (jobId, params) =>
  http.get(`/jobs/${jobId}/applications`, { params, timeout: 60000 })
