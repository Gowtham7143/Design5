import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Home from '../Home';

const SellerProfile = () => {
    const { token } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8080/seller/profile', {
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
        return <Navigate to='/seller/login' />
    }

    return (
        <div>
            {profileData ? (
                <>
                    <h2 className="text-center">Hi {profileData.name}</h2>
                    <Home></Home>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SellerProfile;
