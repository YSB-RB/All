"use client"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { HiOutlineX } from "react-icons/hi"
import { Backend_Server_URL, Configuraton_endPoint, Configuraton_Post_endPoint, Media_endPoint } from '@/components/configurationData/ConfigurationData';



const ConfigurationPage = () => {
    const [configFormData, setConfigFormData] = useState({
        logo: null,
        toolname: '',
        ServerIPAddress: '',
        facebookLink: '',
        twitter: '',
        linkedinLink: '',
        instagramLink: '',
        copyRights: '',
        terms_conditions: '',
    });



    const fileInputRef = useRef(null);
    const [previousLogoId, setPreviousLogoId] = useState(null);
    const [logoPath, setLogoPath] = useState(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleConfigChange = (field, value) => {
        setConfigFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogoChange = (e) => {
        const image = e.target.files[0];
        setConfigFormData((prev) => ({ ...prev, logo: image }));
        if (image) {
            const reader = new FileReader();
            reader.onload = () => {
                setLogoPath(reader.result);
            };
            reader.readAsDataURL(image);
        }
    };

    const handleDelete = async () => {
        try {
            // Delete from media API
            await fetch(`${Media_endPoint}/${configFormData.logo}`, {
                method: "DELETE",
            });
            console.log("Image deleted from media API successfully");

            // Delete from configuration API
            await fetch(`${Media_endPoint}/${configFormData.logo}`, {
                method: "DELETE",
            });
            console.log("Image deleted from configuration API successfully");

            // Update local state and local storage
            setConfigFormData((prev) => ({ ...prev, logo: null }));
            //   localStorage.setItem("configFormData", JSON.stringify({ ...configFormData, logo: null }));
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const FetchData = async () => {
        try {
            const configurationData = await FetchConfigurationData();
            setConfigFormData((prevData) => ({
                ...prevData,
                logo: configurationData.logo,
                toolname: configurationData.toolname,
                ServerIPAddress: configurationData.ServerIPAddress,
                facebookLink: configurationData.facebookLink,
                linkedinLink: configurationData.linkedinLink,
                twitter: configurationData.twitter,
                instagramLink: configurationData.instagramLink,
                copyRights: configurationData.copyRights,
                terms_conditions: configurationData.terms_conditions,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        FetchData();
    }, []);

    const FetchConfigurationData = async () => {
        try {
            const response = await fetch(
                `${Configuraton_endPoint}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const configurationObjects = await response.json();
            const configurationData = {};
            configurationObjects.forEach((obj) => {
                configurationData[obj.keyy] = obj.value;
            });
            // localStorage.setItem("ConfigurationObject", JSON.stringify(configurationData));
            return configurationData;
        } catch (error) {
            console.error("Error fetching configuration:", error);
            throw error;
        }
    };

    // Fetch the previous logo ID from API
    useEffect(() => {
        const FetchLogoId = async () => {
            try {
                const response = await axios.get(`${Configuraton_endPoint}logo`);
                console.log("LogoId", response.data.value);
                setPreviousLogoId(response.data.value);
            } catch (error) {
                console.error("Error fetching previous logo ID:", error);
            }
        };
        FetchLogoId();
    }, []);

    //load logo
    useEffect(() => {
        if (configFormData.logo) {
            FetchLogoUrl(configFormData.logo);
        }
    }, [configFormData.logo]);

    const FetchLogoUrl = async (logoId) => {
        try {
            const response = await axios.get(`${Me}/${logoId}`
            );
            localStorage.setItem("LogoPath", JSON.stringify(response.data.globalPath));
            console.log("Logo URL :  ", response.data.globalPath);
            setLogoPath(response.data.globalPath);
        } catch (error) {
            console.error("Error fetching logo URL:", error);
        }
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        let imageId;
        let shouldUploadImage = true;
        let imageGlobalPath;

        //image upload
        if (configFormData.logo !== previousLogoId) {
            try {
                const imageData = new FormData();
                imageData.append("image", configFormData.logo);
                const response = await axios.post(`${Media_endPoint}`, imageData);
                imageId = response.data.id;
                imageGlobalPath = response.data.globalPath;
                console.log("ImageGloabalPath", imageGlobalPath)
            } catch (error) {
                console.error("Error uploading image:", error);
                throw error;
            }
        } else {
            shouldUploadImage = false;
        }

        const ConfigData = [
            {
                keyy: "logo",
                value: shouldUploadImage ? imageId : previousLogoId,
            },
            {
                keyy: "toolname",
                value: configFormData.toolname,
            },
            {
                keyy: "ServerIPAddress",
                value: configFormData.ServerIPAddress,
            },
            {
                keyy: "facebookLink",
                value: configFormData.facebookLink,
            },
            {
                keyy: "linkedinLink",
                value: configFormData.linkedinLink,
            },
            {
                keyy: "twitter",
                value: configFormData.twitter,
            },
            {
                keyy: "instagramLink",
                value: configFormData.instagramLink,
            },
            {
                keyy: "copyRights",
                value: configFormData.copyRights,
            },
            {
                keyy: "terms_conditions",
                value: configFormData.terms_conditions,
            },
        ];

        try {
            const response = await axios.post(`Configuraton_Post_endPoint`, ConfigData);
            const configurationData = {};
            ConfigData.forEach((obj) => { configurationData[obj.keyy] = obj.value });
            localStorage.setItem("ConfigurationObject", JSON.stringify(configurationData));
        } catch (error) {
            console.error("ERROR IN POST CONFIG:", error);
            throw error;
        }
        setConfigFormData({
            logo: null,
            toolname: "",
            ServerIPAddress: "",
            facebookLink: "",
            linkedinLink: "",
            twitter: "",
            instagramLink: "",
            copyRights: "",
            terms_conditions: "",
        });

        FetchData(); //reload data from api
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-screen max-w-4xl mt-10 bg-white shadow-lg rounded-lg p-8 animate__animated animate__fadeIn">
                <h1 className="text-4xl font-bold mb-6 text-center">Configuration Page</h1>
                <form onSubmit={HandleSubmit} className="space-y-6">
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="fileInput">
                            Upload Logo:
                        </label>
                        <div className="flex items-center justify-center">
                            <div className="flex items-center space-x-6 mb-6 relative group">
                                <div
                                    className="relative group w-32 h-32 md:w-30 md:h-30 lg:w-30 lg:h-30 rounded-full overflow-hidden shadow-md cursor-pointer"
                                    onClick={handleImageClick}>
                                    {configFormData.logo ? (
                                        <>
                                            <img
                                                src={logoPath}
                                                alt="logo"
                                                className="w-full h-full object-contain"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleDelete}
                                                className="absolute top-5 right-5  bg-red-600 text-red-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 hover:text-white transition-opacity duration-300"
                                            >
                                                <HiOutlineX />
                                            </button>
                                        </>
                                    ) : (
                                        <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-4 border-dashed border-gray-300 rounded-full transition-transform transform hover:scale-105">
                                            <span className="text-gray-400 text-4xl">+</span>
                                        </label>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleLogoChange}
                                    ref={fileInputRef}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mb-6">
                        <label className="w-1/3 text-lg font-medium text-gray-700" htmlFor="toolname">
                            Tool Name:
                        </label>
                        <input
                            type="text"
                            name="toolname"
                            id="toolname"
                            className="w-2/3 px-4 py-2 border bg-[#F9FAFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Tool Name"
                            value={configFormData.toolname}
                            onChange={(e) => handleConfigChange('toolname', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center mb-6">
                        <label className="w-1/3 text-lg font-medium text-gray-700" htmlFor="ServerIPAddress">
                            Backend Server IP Address:
                        </label>
                        <input
                            type="text"
                            name="ServerIPAddress"
                            id="ServerIPAddress"
                            className="w-2/3 px-4 py-2 border bg-[#F9FAFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Backend Server IP Address"
                            value={configFormData.ServerIPAddress}
                            onChange={(e) => handleConfigChange('ServerIPAddress', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center mb-6">
                        <label className="w-1/3 text-lg font-medium text-gray-700" htmlFor="facebookLink">
                            Facebook Link:
                        </label>
                        <input
                            type="text"
                            name="facebookLink"
                            id="facebookLink"
                            className="w-2/3 px-4 py-2 border bg-[#F9FAFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Facebook Account Link"
                            value={configFormData.facebookLink}
                            onChange={(e) => handleConfigChange('facebookLink', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center mb-6">
                        <label className="w-1/3 text-lg font-medium text-gray-700" htmlFor="twitter">
                            Twitter Link:
                        </label>
                        <input
                            type="text"
                            name="twitter"
                            id="twitter"
                            className="w-2/3 px-4 py-2 border bg-[#F9FAFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Twitter Account Link"
                            value={configFormData.twitter}
                            onChange={(e) => handleConfigChange('twitter', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center mb-6">
                        <label className="w-1/3 text-lg font-medium text-gray-700" htmlFor="linkedinLink">
                            Linkedin Link:
                        </label>
                        <input
                            type="text"
                            name="linkedinLink"
                            id="linkedinLink"
                            className="w-2/3 px-4 py-2 border bg-[#F9FAFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Linkedin Account Link"
                            value={configFormData.linkedinLink}
                            onChange={(e) => handleConfigChange('linkedinLink', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center mb-6">
                        <label className="w-1/3 text-lg font-medium text-gray-700" htmlFor="instagramLink">
                            Instagram Link:
                        </label>
                        <input
                            type="text"
                            name="instagramLink"
                            id="instagramLink"
                            className="w-2/3 px-4 py-2 border bg-[#F9FAFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Instagram Account Link"
                            value={configFormData.instagramLink}
                            onChange={(e) => handleConfigChange('instagramLink', e.target.value)}
                        />
                    </div>

                    <div className="flex items-start mb-6">
                        <label className="w-1/3 text-lg font-medium text-gray-700" htmlFor="copyRights">
                            Copy Rights:
                        </label>
                        <textarea
                            name="copyRights"
                            id="copyRights"
                            className="w-2/3 px-4 py-2 border bg-[#F9FAFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                            placeholder="Enter Copy Right Message"
                            value={configFormData.copyRights}
                            onChange={(e) => handleConfigChange('copyRights', e.target.value)}
                        ></textarea>
                    </div>

                    <div className="flex items-start mb-6">
                        <label className="w-1/3 text-lg font-medium text-gray-700" htmlFor="terms_conditions">
                            Terms and Conditions:
                        </label>
                        <textarea
                            name="terms_conditions"
                            id="terms_conditions"
                            className="w-2/3 px-4 py-2 border bg-[#F9FAFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
                            placeholder="Enter Terms And Conditions"
                            value={configFormData.terms_conditions}
                            onChange={(e) => handleConfigChange('terms_conditions', e.target.value)}
                        ></textarea>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ConfigurationPage