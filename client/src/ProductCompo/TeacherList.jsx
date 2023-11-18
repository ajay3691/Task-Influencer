import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DashboardMenu from '../AuthCompo/DashboardMenu'; // Import the DashboardMenu component

const TeachersList = () => {
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/teacher/teachers');
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Delete the teacher with the given ID
            await axios.delete(`http://localhost:5000/teacher/teachers/${id}`);
            // Remove the deleted teacher from the state
            setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== id));
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    return (
        <div className="dashboard-container">
            {/* Dashboard Sidebar */}
            <div className="dashboard-sidebar">
                <div className="dashboard-brand">
                    <h2>Dashboard</h2>
                </div>
                <DashboardMenu />
            </div>

            {/* Dashboard Content */}
            <div className="dashboard-content">
                <div className="container mt-5">
                    <div className="d-flex justify-content-between mb-3">
                        <h2>Teachers List</h2>
                        <Link to="/createTeacher" className="btn btn-success">
                            Add Teacher
                        </Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subjects</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher) => (
                                <tr key={teacher.id}>
                                    <td>{teacher.id}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.subjects}</td>
                                    <td>
                                        <Link to={`/teacherEdit`} className="btn btn-warning mr-2">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(teacher.id)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeachersList;
