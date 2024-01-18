import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BuyerSignUp = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState(true);

    const handleSignUp = async (e) => {
        try {
            e.preventDefault();
            await axios.post('http://localhost:8080/buyer/register', {
                name,
                username,
                password,
            });
            setFlag(false);
        } catch (error) {
            setFlag(true);
            console.error('Buyer SignUp failed:', error.message);
        }
    };

    return (
        <div className="rounded shadow-md flex items-center justify-center h-screen bg-gray-400">
            <form onSubmit={handleSignUp} className="bg-white p-10 rounded shadow bg-gray-200">
                <h2 className="text-2xl font-bold mb-4 flex justify-center text-gray-800">SignUp</h2>

                <div className="mb-4">
                    <label htmlFor="buyer-name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        id="buyer-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="buyer-username" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="buyer-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="buyer-password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                        type="password"
                        id="buyer-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <button className="bg-blue-500 text-white rounded p-2 w-full" type='submit'>Submit</button>
                {!flag ? (
                    <h1 className="text-green-600">
                        Registered successfully.{' '}
                        <Link className="text-blue-600" to="/buyer/BuyerLogin">
                            Kindly Login
                        </Link>
                    </h1>
                ) : (
                    <div className="text-red-500">
                        Existing customer?{' '}
                        <Link to="/buyer/BuyerLogin" className="text-blue-500">
                            Login
                        </Link>
                    </div>
                )}
            </form>
        </div>
    );
};

export default BuyerSignUp;