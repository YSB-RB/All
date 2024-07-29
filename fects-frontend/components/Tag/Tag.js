import React, { useState, useEffect } from 'react'
import { FaCircle } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";


export const Tag = () => {
    const tags = [
        { label: 'Family', color: 'text-primary', count: 12 },
        { label: 'Friends', color: 'text-info', count: 3 },
        { label: 'Work', color: 'text-success', count: 67 },
        { label: 'Trips', color: 'text-warning', count: 5 },
        { label: 'Other', color: 'text-danger', count: 1 },
    ];

    return (
        <div className="mb-4">
            <div className="text-sm mb-3 text-gray-500">Tags</div>
            <div className="flex flex-col space-y-2">
                {tags.map((tag, index) => (
                    <span key={index} className="flex items-center p-2 rounded-md">
                        <FaCircle className={`${tag.color} mr-2`} size={13} />
                        <span className='text-sm  text-black-500 cursor-pointer'>{tag.label}</span>
                        <span className="cursor-pointer ml-auto bg-secondary bg-gray-100 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-500 dark:text-gray-300">{tag.count}</span>
                    </span>
                ))}
                <span className="cursor-pointer flex items-center p-2 flex gap-2">
                    <CiCirclePlus size={30} />
                    Add New Label
                </span>
            </div>
        </div>
    );
}

