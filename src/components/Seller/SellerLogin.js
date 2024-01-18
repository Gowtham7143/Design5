import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../AuthContext';

const SellerLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:8080/seller/login', {
                username,
                password,
            });

            const { token } = response.data;
            login(token);
            if (token) {
                window.location.href = '/seller/profile';
            }
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <div className="flex items-center shadow-md justify-center h-screen bg-gray-400">
            <form onSubmit={handleLogin} className="bg-white p-10 rounded shadow bg-gray-200">
                <h2 className="text-2xl font-bold mb-4 flex justify-center text-gray-800">Seller Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <br />
                <button className="bg-blue-500 text-white rounded p-2 w-full" onClick={handleLogin}>Submit</button>

                <div>
                    <label />
                    <div className="text-gray-700">
                        New customer? <Link to="/seller/signup" className="text-blue-500">Create your account</Link>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default SellerLogin

