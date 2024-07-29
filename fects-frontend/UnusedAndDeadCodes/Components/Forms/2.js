import React from 'react'

const Form2 = () => {
    return (

        <div className="mt-10 w-[1024px] mr-10 flex justify-center items-center">
            <div className="grid grid-cols-12 gap-3">
                {userId && (
                    <div className="col-span-12">
                        <ProfileHeader userData={formData} />
                    </div>
                )}
                <div className="col-span-12">
                    <div className="mb-3">
                        <div className="p-4">
                            <div className="mb-4 flex">
                                <p className="text-lg font-semibold">Basic Details</p>
                                <span className="ml-auto text-sm">
                                    Fields marked with <span className="text-red-500">*</span> are required.
                                </span>
                            </div>
                            <form>
                                <div className="grid grid-cols-12 gap-2">
                                    <div className="col-span-12 sm:col-span-6 relative">
                                        <input
                                            className="w-full p-2 bg-gray-100 rounded-sm"
                                            required
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter Name"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <input
                                            className="w-full p-2 bg-gray-100 rounded-sm"
                                            required
                                            type="email"
                                            placeholder="Enter Email"
                                            name="email"
                                            onChange={handleChange}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <input
                                            className="w-full p-2 bg-gray-100 rounded-sm"
                                            required
                                            type="text"
                                            placeholder="Enter Username"
                                            name="username"
                                            onChange={handleInputChange}
                                        />
                                        {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                                        {availability && <p className="text-xs">{availability}</p>}
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <select
                                            className="w-full p-2 bg-gray-100 rounded-sm"
                                            name="gender"
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <input
                                            className="w-full p-2 bg-gray-100 rounded-sm"
                                            type="date"
                                            name="birthdate"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <select
                                            className="w-full p-2 bg-gray-100 rounded-sm"
                                            name="maritalStatus"
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            <option value="MARRIED">Married</option>
                                            <option value="SINGLE">Single</option>
                                            <option value="DIVORCED">Divorced</option>
                                            <option value="WIDOW">Widow</option>
                                        </select>
                                    </div>
                                    <div className="col-span-12">
                                        <input
                                            className="w-full p-2 bg-gray-100 rounded-sm"
                                            type="file"
                                            onChange={handleImageChange}
                                        />
                                        <p className="text-xs mt-1">
                                            JPG, GIF, PNG, MOV, and AVI. Please choose files under 5MB to upload. File sizes are 400 x 300px.
                                        </p>
                                    </div>
                                    <div className="col-span-12">
                                        <textarea
                                            className="w-full p-2 bg-gray-100 rounded-sm"
                                            placeholder="Enter First Address"
                                            name="addressOne"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-12 grid grid-cols-12 gap-2">
                                        <div className="col-span-12 sm:col-span-6">
                                            <input
                                                className="w-full p-2 bg-gray-100 rounded-sm"
                                                type="text"
                                                placeholder="Enter Country"
                                                name="country"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-span-12 sm:col-span-6">
                                            <input
                                                className="w-full p-2 bg-gray-100 rounded-sm"
                                                type="text"
                                                placeholder="Enter County"
                                                name="county"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-span-12 sm:col-span-6">
                                            <input
                                                className="w-full p-2 bg-gray-100 rounded-sm"
                                                type="text"
                                                placeholder="Enter Street"
                                                name="street"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-span-12 sm:col-span-6">
                                            <input
                                                className="w-full p-2 bg-gray-100 rounded-sm"
                                                type="text"
                                                placeholder="Enter Apt/Suite/Other"
                                                name="apt"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-span-12 sm:col-span-4">
                                            <input
                                                className="w-full p-2 bg-gray-100 rounded-sm"
                                                type="text"
                                                placeholder="Enter Zip Code"
                                                name="zipCode"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-span-12 sm:col-span-4">
                                            <input
                                                className="w-full p-2 bg-gray-100 rounded-sm"
                                                type="text"
                                                placeholder="Enter City"
                                                name="city"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-span-12 sm:col-span-4">
                                            <input
                                                className="w-full p-2 bg-gray-100 rounded-sm"
                                                type="text"
                                                placeholder="Enter State"
                                                name="state"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <select
                                            className="w-full p-2 bg-gray-100 rounded-sm"
                                            name="phoneType"
                                            onChange={handleChange}
                                        >
                                            <option value="MOBILE">Mobile</option>
                                            <option value="LANDLINE">Landline</option>
                                        </select>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <input
                                            className="w-full p-2 bg-gray-100 rounded-sm"
                                            type="number"
                                            placeholder="Enter Phone Number"
                                            name="phoneNumber"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Form2