"use client"


import { useState, useRef } from 'react';
import { HiOutlineX } from "react-icons/hi"

export default function ImageUpload() {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (!imageSrc) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };




  const handleDelete = () => {
    setImageSrc(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-6 mb-6">
          <div
            className="relative group w-32 h-32 md:w-30 md:h-30 lg:w-30 lg:h-30 rounded-full overflow-hidden shadow-md cursor-pointer"
            onClick={handleImageClick}
          >
            {imageSrc ? (
              <>
                <img
                  src={imageSrc}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={handleDelete}
                  className="absolute top-3 right-2  bg-red-600 text-red-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 hover:text-white transition-opacity duration-300"
                >
                  <HiOutlineX />
                </button>
              </>
            ) : (
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-4 border-dashed border-gray-300 rounded-full transition-transform transform hover:scale-105"
              >
                <span className="text-gray-400 text-4xl">+</span>
              </label>
            )}
          </div>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
      </div>

      <div className="flex items-center justify-center mt-10">
        <div className="flex items-center space-x-6 mb-6">
          <div
            className="w-20 h-20 md:w-30 md:h-30 lg:w-30 lg:h-30 rounded-full overflow-hidden shadow-md cursor-pointer"
            onClick={handleImageClick}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Profile"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            ref={fileInputRef}
          // className="hidden"
          />
        </div>
      </div>
    </>

  );
}
