import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
    const { token, logout } = useAuth();
    return (
        <div className="bg-gray-800 p-4 flex items-center">
            <Link to="/">
                <img alt='logo' src={process.env.PUBLIC_URL + '/ecommerce-logo.png'} className="w-21 h-9 mr-2"></img>
            </Link>

            <div className='flex items-center ml-auto'>
                {token ? (
                    <button className="text-white" onClick={() => logout()}>Logout</button>
                ) : (
                    <>
                        <Link to='/buyer/BuyerLogin' className="text-white mr-4">Login</Link>
                        <Link to="/seller/login" className="text-white mr-4">Become a Seller</Link>
                        <Link to="/cart" className="text-white mr-4">Cart</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;

