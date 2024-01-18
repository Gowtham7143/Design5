import React from 'react';
import Footer from './Footer';

const Display = () => {
    return (
        <div className="">
            <div className="flex flex-col items-center space-y-4 bg-gray-400">
                <div className="flex items-center m-2">
                    <h1 className="text-4xl font-bold">Welcome to E-Commerce</h1>
                </div>
                <div className="">
                    <img src='https://www.thedesign5.com/wp-content/uploads/2022/04/cropped-pexels-olia-danilevich-4974915-1.jpg' alt='alt_image' />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Display;
