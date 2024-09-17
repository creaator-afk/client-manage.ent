// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import JobTable from './components/JobTable.jsx';
import JobModal from './components/JobModal.jsx';
import { JobProvider } from './context/JobContext';

function App() {
    const [show, setShow] = useState(false);
    const [viewShow, setViewShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleViewClose = () => setViewShow(false);
    const handleViewShow = () => setViewShow(true);

    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    return (
        <JobProvider>
            <Header />
            <div className="container-fluid">
                <div className="row mb-3">
                    <div className="d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search by client name or ID..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" type="button" style={{background: "darkblue"}}>Search</button>
                    </div>
                    <button className="btn btn-primary w-auto mt-2 mx-auto" type="button" style={{background: "darkblue"}} onClick={handleShow}>New Job Sheet</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <JobTable onView={handleViewShow} onEdit={handleEditShow} searchQuery={searchQuery} />
                    </div>
                </div>
            </div>
            <Footer />

            <JobModal show={show} handleClose={handleClose} mode="new" />
            <JobModal show={viewShow} handleClose={handleViewClose} mode="view" />
            <JobModal show={editShow} handleClose={handleEditClose} mode="edit" />
        </JobProvider>
    );
}

export default App;