import React, { useContext, useEffect } from 'react';
import { store } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Myprofile = () => {
    const [token, setToken] = useContext(store);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            // Redirect to '/login' if token is not available
            navigate('/login');
        } else {
            // Fetch data for admin role using 'x-token'
            axios.get('http://localhost:5000/user/dashboard', {
                headers: { 'x-token': token }
            })
                .then((resp) => {
                    // Handle the data if needed
                    console.log('Admin Data:', resp.data);
                    navigate('/dashboard');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [token, navigate]); // Added 'navigate' to the dependency array

    useEffect(() => {
        if (!token) {
            // Redirect to '/login' if token is not available
            navigate('/login');
        } else {
            // Fetch data for teacher role using 'y-token'
            axios.get('http://localhost:5000/user/teachersBoard', {
                headers: { 'y-token': token }
            })
                .then((resp) => {
                    // Handle the data if needed
                    console.log('Teacher Data:', resp.data);
                    navigate('/teachersBoard');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [token, navigate]);

    return (
        <div>
            {/* Add content as needed */}
        </div>
    );
};

export default Myprofile;
