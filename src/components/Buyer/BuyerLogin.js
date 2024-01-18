import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';

const BuyerLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const { login } = useAuth();

    const sendOtp = async () => {
        try {
            //sending otp
            await axios.post('http://localhost:8080/buyer/send-otp', { email: username });
            setOtpSent(true);
        } catch (error) {
            console.error('Failed to send OTP:', error.message);
        }
    };

    useEffect(() => {
        setOtp('');
        setOtpSent(false);
    }, [showOtpInput]);

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            if (showOtpInput) {
                // Verify OTP
                const response = await axios.post('http://localhost:8080/buyer/verify-otp', {
                    email: username,
                    otp,
                });

                const { token } = response.data;
                login(token);
                if (token) {
                    window.location.href = '/buyer/profile';
                }
            } else {
                // Login with password
                const response = await axios.post('http://localhost:8080/buyer/login', {
                    username,
                    password,
                });

                const { token } = response.data;
                login(token);
                if (token) {
                    window.location.href = '/buyer/profile';
                }
            }
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    const toggleLoginOption = () => {
        setShowOtpInput((prev) => !prev);
    };

    return (
        <div className="flex items-center shadow-md justify-center h-screen bg-gray-400">
            <form onSubmit={handleLogin} className="bg-white p-10 rounded shadow bg-gray-200">
                <h2 className="text-2xl font-bold mb-4 flex justify-center text-gray-800">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input className="border rounded p-2 w-full" type="email" id="email" placeholder="Enter email" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                {showOtpInput ? (
                    <>
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
                            <input className="border rounded p-2 w-full" type="text" id="otp" placeholder="Enter OTP" required value={otp} onChange={(e) => setOtp(e.target.value)} />
                        </div>
                        <div className="mt-2">
                            <button type="button" onClick={sendOtp} className="text-gray-700 underline cursor-pointer" disabled={otpSent}>
                                {otpSent ? 'Resend OTP' : 'Send OTP'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input className="border rounded p-2 w-full" type="password" id="password" placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                )}

                <br />
                <button className="bg-blue-500 text-white rounded p-2 w-full" onClick={handleLogin}>
                    {showOtpInput ? 'Submit OTP' : 'Login with Password'}
                </button>
                <div className="mt-2">
                    <button type="button" onClick={toggleLoginOption} className="text-gray-700 underline cursor-pointer">
                        {showOtpInput ? 'Login with Password' : 'Login with OTP'}
                    </button>
                </div>
                <div className="mt-4">
                    <label />
                    <div className="text-gray-700">
                        New customer? <Link to="/buyer/signup" className="text-blue-500">Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BuyerLogin;
