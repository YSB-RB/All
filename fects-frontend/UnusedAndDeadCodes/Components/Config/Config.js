        // <div className="container mx-auto p-4">
        //     <h1 className="text-3xl font-semibold mb-4">Configuration</h1>
        //     <div className="bg-white shadow-md rounded p-4">
        //         <form onSubmit={handleSubmit}>
        //             <div className="mb-4">
        //                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fileInput">
        //                     Upload Logo:
        //                 </label>
        //                 <div className="flex items-center">
        //                     {configFormData.logo ? (
        //                         <div className="relative">
        //                             <img src={configFormData.logo} alt="Selected" className="w-32 h-32 object-cover rounded" />
        //                             <button type="button" onClick={handleDelete} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full">
        //                                 <i className="fa fa-trash"></i>
        //                             </button>
        //                         </div>
        //                     ) : (
        //                         <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded">
        //                             <span className="text-gray-400 text-3xl">+</span>
        //                             <input
        //                                 type="file"
        //                                 accept="image/*"
        //                                 id="fileInput"
        //                                 name="logo"
        //                                 className="hidden"
        //                                 onChange={handleLogoChange}
        //                             />
        //                         </label>
        //                     )}
        //                 </div>
        //             </div>

        //             <div className="mb-4">
        //                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="toolname">
        //                     Tool Name:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="toolname"
        //                     id="toolname"
        //                     className="w-full px-3 py-2 border rounded"
        //                     placeholder="Enter Tool Name"
        //                     value={configFormData.toolname}
        //                     onChange={(e) => handleConfigChange('toolname', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-4">
        //                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ServerIPAddress">
        //                     Backend Server IP Address:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="ServerIPAddress"
        //                     id="ServerIPAddress"
        //                     className="w-full px-3 py-2 border rounded"
        //                     placeholder="Backend Server IP Address"
        //                     value={configFormData.ServerIPAddress}
        //                     onChange={(e) => handleConfigChange('ServerIPAddress', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-4">
        //                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="facebookLink">
        //                     Facebook Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="facebookLink"
        //                     id="facebookLink"
        //                     className="w-full px-3 py-2 border rounded"
        //                     placeholder="Enter Facebook Account Link"
        //                     value={configFormData.facebookLink}
        //                     onChange={(e) => handleConfigChange('facebookLink', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-4">
        //                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="twitter">
        //                     Twitter Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="twitter"
        //                     id="twitter"
        //                     className="w-full px-3 py-2 border rounded"
        //                     placeholder="Enter Twitter Account Link"
        //                     value={configFormData.twitter}
        //                     onChange={(e) => handleConfigChange('twitter', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-4">
        //                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="linkedinLink">
        //                     Linkedin Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="linkedinLink"
        //                     id="linkedinLink"
        //                     className="w-full px-3 py-2 border rounded"
        //                     placeholder="Enter Linkedin Account Link"
        //                     value={configFormData.linkedinLink}
        //                     onChange={(e) => handleConfigChange('linkedinLink', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-4">
        //                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="instagramLink">
        //                     Instagram Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="instagramLink"
        //                     id="instagramLink"
        //                     className="w-full px-3 py-2 border rounded"
        //                     placeholder="Enter Instagram Account Link"
        //                     value={configFormData.instagramLink}
        //                     onChange={(e) => handleConfigChange('instagramLink', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-4">
        //                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="copyRights">
        //                     Copy Rights:
        //                 </label>
        //                 <textarea
        //                     name="copyRights"
        //                     id="copyRights"
        //                     className="w-full px-3 py-2 border rounded h-32"
        //                     placeholder="Enter Copy Right Message"
        //                     value={configFormData.copyRights}
        //                     onChange={(e) => handleConfigChange('copyRights', e.target.value)}
        //                 ></textarea>
        //             </div>

        //             <div className="mb-4">
        //                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="terms_conditions">
        //                     Terms and Conditions:
        //                 </label>
        //                 <textarea
        //                     name="terms_conditions"
        //                     id="terms_conditions"
        //                     className="w-full px-3 py-2 border rounded h-64"
        //                     placeholder="Enter Terms And Conditions"
        //                     value={configFormData.terms_conditions}
        //                     onChange={(e) => handleConfigChange('terms_conditions', e.target.value)}
        //                 ></textarea>
        //             </div>

        //             <div className="flex justify-center">
        //                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        //                     Save
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>

        // <div className="container mx-auto p-6">
        //     <h1 className="text-4xl font-bold mb-6 text-center">Configuration Page</h1>
        //     <div className="bg-white shadow-lg rounded-lg p-8 animate__animated animate__fadeIn">
        //         <form onSubmit={handleSubmit}>
        // <div className="mb-6">
        //     <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="fileInput">
        //         Upload Logo:
        //     </label>
        //     <div className="flex items-center justify-center">
        //         {configFormData.logo ? (
        //             <div className="relative group">
        //                 <img src={configFormData.logo} alt="Selected" className="w-32 h-32 object-cover rounded-full shadow-lg" />
        //                 <button
        //                     type="button"
        //                     onClick={handleDelete}
        //                     className="absolute top-0 right-0 p-2 bg-red-600 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        //                 >
        //                     <i className="fa fa-trash"></i>
        //                 </button>
        //             </div>
        //         ) : (
        //             <label
        //                 htmlFor="fileInput"
        //                 className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-4 border-dashed border-gray-300 rounded-full transition-transform transform hover:scale-105"
        //             >
        //                 <span className="text-gray-400 text-4xl">+</span>
        //                 <input
        //                     type="file"
        //                     accept="image/*"
        //                     id="fileInput"
        //                     name="logo"
        //                     className="hidden"
        //                     onChange={handleLogoChange}
        //                 />
        //             </label>
        //         )}
        //     </div>
        // </div>

        //             <div className="mb-6 flex justify-center items-center border-2 gap-6">
        //                 <label className="block grid  text-lg font-medium text-gray-700 mb-2" htmlFor="toolname">
        //                     Tool Name:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="toolname"
        //                     id="toolname"
        //                     className="px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2  focus:ring-blue-500"
        //                     placeholder="Enter Tool Name"
        //                     value={configFormData.toolname}
        //                     onChange={(e) => handleConfigChange('toolname', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="ServerIPAddress">
        //                     Backend Server IP Address:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="ServerIPAddress"
        //                     id="ServerIPAddress"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Backend Server IP Address"
        //                     value={configFormData.ServerIPAddress}
        //                     onChange={(e) => handleConfigChange('ServerIPAddress', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="facebookLink">
        //                     Facebook Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="facebookLink"
        //                     id="facebookLink"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Enter Facebook Account Link"
        //                     value={configFormData.facebookLink}
        //                     onChange={(e) => handleConfigChange('facebookLink', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="twitter">
        //                     Twitter Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="twitter"
        //                     id="twitter"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Enter Twitter Account Link"
        //                     value={configFormData.twitter}
        //                     onChange={(e) => handleConfigChange('twitter', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="linkedinLink">
        //                     Linkedin Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="linkedinLink"
        //                     id="linkedinLink"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Enter Linkedin Account Link"
        //                     value={configFormData.linkedinLink}
        //                     onChange={(e) => handleConfigChange('linkedinLink', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="instagramLink">
        //                     Instagram Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="instagramLink"
        //                     id="instagramLink"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Enter Instagram Account Link"
        //                     value={configFormData.instagramLink}
        //                     onChange={(e) => handleConfigChange('instagramLink', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="copyRights">
        //                     Copy Rights:
        //                 </label>
        //                 <textarea
        //                     name="copyRights"
        //                     id="copyRights"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        //                     placeholder="Enter Copy Right Message"
        //                     value={configFormData.copyRights}
        //                     onChange={(e) => handleConfigChange('copyRights', e.target.value)}
        //                 ></textarea>
        //             </div>

        //             <div className="mb-6">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="terms_conditions">
        //                     Terms and Conditions:
        //                 </label>
        //                 <textarea
        //                     name="terms_conditions"
        //                     id="terms_conditions"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
        //                     placeholder="Enter Terms And Conditions"
        //                     value={configFormData.terms_conditions}
        //                     onChange={(e) => handleConfigChange('terms_conditions', e.target.value)}
        //                 ></textarea>
        //             </div>



        //             {/* <div className="mb-6 grid grid-cols-2 gap-4">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="toolname">
        //                     Tool Name:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="toolname"
        //                     id="toolname"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Enter Tool Name"
        //                     value={configFormData.toolname}
        //                     onChange={(e) => handleConfigChange('toolname', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6 grid grid-cols-2 gap-4">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="ServerIPAddress">
        //                     Backend Server IP Address:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="ServerIPAddress"
        //                     id="ServerIPAddress"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Backend Server IP Address"
        //                     value={configFormData.ServerIPAddress}
        //                     onChange={(e) => handleConfigChange('ServerIPAddress', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6 grid grid-cols-2 gap-4">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="facebookLink">
        //                     Facebook Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="facebookLink"
        //                     id="facebookLink"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Enter Facebook Account Link"
        //                     value={configFormData.facebookLink}
        //                     onChange={(e) => handleConfigChange('facebookLink', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6 grid grid-cols-2 gap-4">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="twitter">
        //                     Twitter Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="twitter"
        //                     id="twitter"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Enter Twitter Account Link"
        //                     value={configFormData.twitter}
        //                     onChange={(e) => handleConfigChange('twitter', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6 grid grid-cols-2 gap-4">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="linkedinLink">
        //                     Linkedin Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="linkedinLink"
        //                     id="linkedinLink"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Enter Linkedin Account Link"
        //                     value={configFormData.linkedinLink}
        //                     onChange={(e) => handleConfigChange('linkedinLink', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6 grid grid-cols-2 gap-4">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="instagramLink">
        //                     Instagram Link:
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="instagramLink"
        //                     id="instagramLink"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Enter Instagram Account Link"
        //                     value={configFormData.instagramLink}
        //                     onChange={(e) => handleConfigChange('instagramLink', e.target.value)}
        //                 />
        //             </div>

        //             <div className="mb-6 grid grid-cols-2 gap-4">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="copyRights">
        //                     Copy Rights:
        //                 </label>
        //                 <textarea
        //                     name="copyRights"
        //                     id="copyRights"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        //                     placeholder="Enter Copy Right Message"
        //                     value={configFormData.copyRights}
        //                     onChange={(e) => handleConfigChange('copyRights', e.target.value)}
        //                 ></textarea>
        //             </div>

        //             <div className="mb-6 grid grid-cols-2 gap-4">
        //                 <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="terms_conditions">
        //                     Terms and Conditions:
        //                 </label>
        //                 <textarea
        //                     name="terms_conditions"
        //                     id="terms_conditions"
        //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
        //                     placeholder="Enter Terms And Conditions"
        //                     value={configFormData.terms_conditions}
        //                     onChange={(e) => handleConfigChange('terms_conditions', e.target.value)}
        //                 ></textarea>
        //             </div> */}

        //             <div className="flex justify-center">
        //                 <button
        //                     type="submit"
        //                     className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
        //                 >
        //                     Save
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
