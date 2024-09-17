import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { JobContext } from '../context/JobContext';

const JobModal = ({ show, handleClose, mode }) => {
    const { selectedJob, addJob, editJob } = useContext(JobContext);
    const isViewMode = mode === 'view';
    const isEditMode = mode === 'edit';
    const isNewMode = mode === 'new';

    const [formData, setFormData] = useState({
        clientId: '',
        clientName: '',
        contactInfo: '',
        receivedDate: '',
        inventory: '',
        reportedIssues: '',
        clientNotes: '',
        assignedTechnician: '',
        estimatedAmount: '',
        deadline: '',
        status: ''
    });

    useEffect(() => {
        if (selectedJob) {
            setFormData({
                clientId: selectedJob.clientId || '',
                clientName: selectedJob.clientName || '',
                contactInfo: selectedJob.contactInfo || '',
                receivedDate: selectedJob.receivedDate || '',
                inventory: selectedJob.inventory || '',
                reportedIssues: selectedJob.reportedIssues || '',
                clientNotes: selectedJob.clientNotes || '',
                assignedTechnician: selectedJob.assignedTechnician || '',
                estimatedAmount: selectedJob.estimatedAmount || '',
                deadline: selectedJob.deadline || '',
                status: selectedJob.status || ''
            });
        }
    }, [selectedJob]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData); // Debugging log
        if (isEditMode) {
            editJob({ ...selectedJob, ...formData });
        } else if (isNewMode) {
            addJob(formData);
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isViewMode ? 'View Job' : isEditMode ? 'Edit Job' : 'New Job'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isViewMode && selectedJob ? (
                    <div>
                        <p><strong>Client Id:</strong> {selectedJob.clientId}</p>
                        <p><strong>Client Name:</strong> {selectedJob.clientName}</p>
                        <p><strong>Contact Info:</strong> {selectedJob.contactInfo}</p>
                        <p><strong>Received Date:</strong> {new Date(selectedJob.receivedDate).toLocaleDateString()}</p>
                        <p><strong>Inventory:</strong> {selectedJob.inventory}</p>
                        <p><strong>Reported Issues:</strong> {selectedJob.reportedIssues}</p>
                        <p><strong>Client Notes:</strong> {selectedJob.clientNotes}</p>
                        <p><strong>Assigned Technician:</strong> {selectedJob.assignedTechnician}</p>
                        <p><strong>Estimated Amount:</strong> {selectedJob.estimatedAmount}</p>
                        <p><strong>Deadline:</strong> {new Date(selectedJob.deadline).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {selectedJob.status}</p>
                    </div>
                ) : (
                    <Form>
                        <Form.Group controlId="formClientId">
                            <Form.Label>Client Id</Form.Label>
                            <Form.Control type="text" name="clientId" value={formData.clientId} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formClientName">
                            <Form.Label>Client Name</Form.Label>
                            <Form.Control type="text" name="clientName" value={formData.clientName} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formContactInfo">
                            <Form.Label>Contact Info</Form.Label>
                            <Form.Control type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formReceivedDate">
                            <Form.Label>Received Date</Form.Label>
                            <Form.Control type="date" name="receivedDate" value={formData.receivedDate} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formInventory">
                            <Form.Label>Inventory</Form.Label>
                            <Form.Control type="text" name="inventory" value={formData.inventory} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formReportedIssues">
                            <Form.Label>Reported Issues</Form.Label>
                            <Form.Control type="text" name="reportedIssues" value={formData.reportedIssues} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formClientNotes">
                            <Form.Label>Client Notes</Form.Label>
                            <Form.Control type="text" name="clientNotes" value={formData.clientNotes} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formAssignedTechnician">
                            <Form.Label>Assigned Technician</Form.Label>
                            <Form.Control type="text" name="assignedTechnician" value={formData.assignedTechnician} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formEstimatedAmount">
                            <Form.Label>Estimated Amount</Form.Label>
                            <Form.Control type="number" name="estimatedAmount" value={formData.estimatedAmount} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formDeadline">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" name="status" value={formData.status} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {!isViewMode && (
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

JobModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
};

export default JobModal;