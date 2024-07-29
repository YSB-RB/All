import React from 'react'

const BasicContest = () => {
    return (
        <div>

            <div className="container mx-auto p-4">
                <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                    <form onSubmit={handleSubmitToAPI}>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Content Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700">Description:</label>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="Enter Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="createdBy" className="block text-gray-700">Organised By:</label>
                            <input
                                type="text"
                                name="createdBy"
                                id="createdBy"
                                placeholder="Enter Organiser Name"
                                value={formData.createdBy}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="imageUpload" className="block text-gray-700">Upload Images:</label>
                            {/* <UploadImages /> */}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="videoUrl" className="block text-gray-700">Video Link:</label>
                            <input
                                type="text"
                                name="videoUrl"
                                placeholder="Enter Video Url"
                                multiple
                                onChange={(e) => setVideos(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {/* {videos && (
              <ReactPlayer height="200px" width="300px" url={videos} controls />
            )} */}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="timeline" className="block text-gray-700">Time Line:</label>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="startDate" className="block text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="finishDate" className="block text-gray-700">Finish Date</label>
                                    <input
                                        type="date"
                                        name="finishDate"
                                        id="finishDate"
                                        value={formData.finishDate}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="assetType" className="block text-gray-700">Asset Type:</label>
                            <select
                                name="assetType"
                                id="assetType"
                                value={formData.assetType}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="PICTURE">Picture</option>
                                <option value="VIDEO">Video</option>
                                <option value="AUDIO">Audio</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="maxAssetSize" className="block text-gray-700">Max Asset Size (MB):</label>
                            <input
                                type="number"
                                name="maxAssetSize"
                                placeholder="Enter Max Asset Size"
                                value={formData.maxAssetSize}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="tag" className="block text-gray-700">Add Tag:</label>
                            {/* <AddMultiple /> */}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="addPrize" className="block text-gray-700">Add Prize:</label>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                onClick={handleAddPrize}
                            >
                                Add Prize
                            </button>
                            {price.map((x, i) => (
                                <div className="flex space-x-4 mt-2" key={i}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter Prize Name"
                                        onChange={(e) => handleprizeinputchange(e, i)}
                                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder="Enter Prize Description"
                                        onChange={(e) => handleprizeinputchange(e, i)}
                                        className="w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {price.length !== 1 && (
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                            onClick={() => handleremoveprize(i)}
                                        >
                                            x
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="addRules" className="block text-gray-700">Add Rules:</label>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                onClick={handleAddRules}
                            >
                                Add Rules
                            </button>
                            {rule.map((x, i) => (
                                <div className="flex space-x-4 mt-2" key={i}>
                                    <input
                                        type="text"
                                        name="rule"
                                        placeholder="Enter Rule"
                                        onChange={(e) => handleruleinputchange(e, i)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {rule.length !== 1 && (
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                            onClick={() => handleremoverules(i)}
                                        >
                                            x
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="addSocial" className="block text-gray-700">Social Media Links:</label>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                onClick={HandleAddSocialInputs}
                            >
                                Add Social Media
                            </button>
                            {inputs.map((x, i) => (
                                <div className="flex space-x-4 mt-2" key={i}>
                                    <input
                                        type="text"
                                        name="socialMedia"
                                        placeholder="Enter Social Media"
                                        onChange={(e) => HandlSocailInputChange(e, i)}
                                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <input
                                        type="text"
                                        name="link"
                                        placeholder="Enter Link"
                                        onChange={(e) => HandlSocailInputChange(e, i)}
                                        className="w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {inputs.length !== 1 && (
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                            onClick={() => HandleDeleteSocial(i)}
                                        >
                                            x
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                onClick={toggleModal}
                            >
                                Past Contest Reference :
                            </button>
                            {/* <AllContestModal isOpen={modalOpen} toggle={toggleModal} /> */}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="visibility" className="block text-gray-700">Visibility:</label>
                            <select
                                name="visibility"
                                value={formData.visibility}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="Private">Private</option>
                                <option value="Public">Public</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="copyRights" className="block text-gray-700">Copy Rights:</label>
                            <textarea
                                name="copyRights"
                                placeholder="Enter Copy Rights"
                                value={formData.copyRights}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>



        </div>
    )
}

export default BasicContest