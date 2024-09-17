// src/components/JobTable.jsx
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { JobContext } from '../context/JobContext';

const JobTable = ({ onView, onEdit, searchQuery }) => {
    const { jobs, setSelectedJob, removeJob } = useContext(JobContext);

    const filteredJobs = jobs.filter(job =>
        job.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Client Id</th>
                    <th>Client Name</th>
                    <th>Contact Info</th>
                    <th>Received Date</th>
                    <th>Inventory</th>
                    <th>Reported Issues</th>
                    <th>Client Notes</th>
                    <th>Assigned Technician</th>
                    <th>Estimated Amount</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredJobs && filteredJobs.map((job, index) => (
                    job._id && (
                        <tr key={job._id}>
                            <td>{index + 1}</td>
                            <td>{job.clientId}</td>
                            <td>{job.clientName}</td>
                            <td>{job.contactInfo}</td>
                            <td>{new Date(job.receivedDate).toLocaleDateString()}</td>
                            <td>{job.inventory}</td>
                            <td>{job.reportedIssues}</td>
                            <td>{job.clientNotes}</td>
                            <td>{job.assignedTechnician}</td>
                            <td>{job.estimatedAmount}</td>
                            <td>{new Date(job.deadline).toLocaleDateString()}</td>
                            <td>{job.status}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => { setSelectedJob(job); onView(); }}>View</button>
                                <button className="btn btn-warning me-2" onClick={() => { setSelectedJob(job); onEdit(); }}>Edit</button>
                                <button className="btn btn-danger" onClick={() => removeJob(job._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                ))}
            </tbody>
        </table>
    );
};

JobTable.propTypes = {
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
};

export default JobTable;