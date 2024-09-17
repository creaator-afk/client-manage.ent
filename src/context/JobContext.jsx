import React, { createContext, useState, useEffect } from 'react';
import { getJobs, createJob, updateJob, deleteJob } from '../services/jobService';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        getJobs()
            .then(response => setJobs(response.data))
            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

    const addJob = (job) => {
        createJob(job)
            .then(response => setJobs([...jobs, response.data]))
            .catch(error => console.error('Error creating job:', error));
    };

    const editJob = (job) => {
        updateJob(job)
            .then(response => setJobs(jobs.map(j => (j._id === job._id ? response.data : j))))
            .catch(error => console.error('Error updating job:', error));
    };

    const removeJob = (jobId) => {
        deleteJob(jobId)
            .then(() => setJobs(jobs.filter(job => job._id !== jobId)))
            .catch(error => console.error('Error deleting job:', error));
    };

    return (
        <JobContext.Provider value={{ jobs, selectedJob, setSelectedJob, addJob, editJob, removeJob }}>
            {children}
        </JobContext.Provider>
    );
};