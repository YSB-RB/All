import React from 'react'

const Form1 = () => {
    return (
        <div class="container mx-auto p-8">
            <div class="bg-white shadow-md rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4">Basic Details</h2>
                <p class="text-gray-600 mb-6">Fields mark <span class="text-red-600">*</span> are required.</p>
                <form>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-700">First Name <span class="text-red-600">*</span></label>
                            <input type="text" placeholder="Enter First Name" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">Last Name <span class="text-red-600">*</span></label>
                            <input type="text" placeholder="Enter Last Name" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">Email <span class="text-red-600">*</span></label>
                            <input type="email" placeholder="Enter Email" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">User Name <span class="text-red-600">*</span></label>
                            <input type="text" placeholder="Enter Username" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">Gender</label>
                            <select class="w-full mt-1 p-2 border rounded-md">
                                <option>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700">Birthdate</label>
                            <input type="date" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">Marital Status</label>
                            <select class="w-full mt-1 p-2 border rounded-md">
                                <option>Select</option>
                                <option>Married</option>
                                <option>Unmarried</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700">Upload Image</label>
                            <input type="file" class="w-full mt-1 p-2 border rounded-md" />
                            <p class="text-gray-600 mt-1">JPG, GIF, PNG, MOV, and AVI. Please choose a file under 5MB to upload. File sizes are 400 x 300px.</p>
                        </div>
                    </div>
                    <div class="mt-6">
                        <label class="block text-gray-700">Address One</label>
                        <input type="text" placeholder="Enter First Address" class="w-full mt-1 p-2 border rounded-md" />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label class="block text-gray-700">Country</label>
                            <input type="text" placeholder="Enter Country" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">State</label>
                            <input type="text" placeholder="Enter State" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">Street</label>
                            <input type="text" placeholder="Enter Street" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">Apt / Suite / Other</label>
                            <input type="text" placeholder="Enter Apt/Suite/Other" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">Zip Code</label>
                            <input type="text" placeholder="Enter Zip code" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">City</label>
                            <input type="text" placeholder="Enter City" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label class="block text-gray-700">State</label>
                            <input type="text" placeholder="Enter State" class="w-full mt-1 p-2 border rounded-md" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label class="block text-gray-700">Phone</label>
                            <div class="flex">
                                <select class="mr-2 p-2 border rounded-md">
                                    <option>Mobile</option>
                                    <option>Landline</option>
                                </select>
                                <input type="text" placeholder="Enter Your Number" class="w-full p-2 border rounded-md" />
                            </div>
                        </div>
                        <div>
                            <label class="block text-gray-700">Role</label>
                            <select class="w-full mt-1 p-2 border rounded-md">
                                <option>Select</option>
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700">Status</label>
                            <select class="w-full mt-1 p-2 border rounded-md">
                                <option>Select</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-6">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form1