import axios from 'axios';

const API_URL = 'https://client-backend-chi.vercel.app/jobs';

export const getJobs = () => axios.get(API_URL);

export const createJob = (job) => axios.post(API_URL, job);

export const updateJob = (job) => axios.put(`${API_URL}/${job._id}`, job);

export const deleteJob = (jobId) => axios.delete(`${API_URL}/${jobId}`);