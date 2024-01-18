import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SellerSignUp = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState(true);

    const handleSignUp = async (e) => {
        try {
            e.preventDefault();
            await axios.post('http://localhost:8080/seller/register', {
                name,
                username,
                password,
            });
            setFlag(false);
        } catch (error) {
            setFlag(true);
            console.error('Seller SignUp failed:', error.message);
        }
    };

    return (
        <div className="rounded shadow-md flex items-center justify-center h-screen bg-gray-400">
            <form onSubmit={handleSignUp} className="bg-white p-10 rounded shadow bg-gray-200">
                <h2 className="text-2xl font-bold mb-4 flex justify-center text-gray-800">Seller SignUp</h2>

                <div className="mb-4">
                    <label htmlFor="seller-name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        id="seller-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="seller-username" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="seller-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="seller-password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                        type="password"
                        id="seller-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <button type='submit' className="bg-blue-500 text-white rounded p-2 w-full mb-4">
                    Sign Up as Seller
                </button>

                {!flag ? (
                    <h1 className="text-green-600">Registered successfully as a Seller.{' '}
                        <Link className="text-blue-600" to="/seller/login">Kindly Login</Link></h1>
                ) : (
                    <div className="text-gray-700">
                        Existing customer? <Link to="/seller/login" className="text-blue-500 mr-4">Login</Link>
                    </div>
                )}

            </form>
        </div>

    );
};

export default SellerSignUp;
