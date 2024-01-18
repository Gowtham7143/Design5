import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Home from '../Home';

const BuyerProfile = () => {
    const { token } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8080/buyer/profile', {
                    headers: {
                        Authorization: token,
                    },
                });

                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching buyer profile:', error.message);
            }
        };

        if (token) {
            fetchProfile();
        }
    }, [token]);
    if (!token) {
        return <Navigate to='/buyer/BuyerLogin' />
    }

    return (
        <div>
            {profileData ? (
                <>
                    <h2>Hi {profileData.name}</h2>
                    <Home></Home>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BuyerProfile;
