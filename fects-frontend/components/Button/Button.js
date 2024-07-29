"use client";

import React from 'react';

const Button = ({ text, className,  ...props }) => {
    return (
        <button
            className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${className}` }
            {...props}
        >
            {text}
        </button>
    );
};

export default Button;
