    // <div className="container mx-auto p-4">
    //   <div className="grid gap-4">
    //     {userId && (
    //       <div className="w-full">
    //         <ProfileHeader userData={formData} />
    //       </div>
    //     )}
    //     <div className="w-full">
    //       <div className="bg-white shadow-md rounded-md">
    //         <div className="p-4 border-b">
    //           <h2 className="text-xl font-semibold">{userId ? "Update Password" : "Enter Password"}</h2>
    //         </div>
    //         <div className="p-4">
    //           {error && <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">{error}</div>}
    //           {success && <div className="bg-green-100 text-green-700 p-2 rounded-md mb-4">Password updated successfully!</div>}
    //           <form>
    //             {userId && (
    //               <div className="mb-4">
    //                 <label className="block text-gray-700">Old Password</label>
    //                 <input
    //                   type="password"
    //                   name="oldPassword"
    //                   value={formData.password}
    //                   disabled
    //                   className="w-full p-2 border rounded bg-gray-100"
    //                 />
    //               </div>
    //             )}
    //             <div className="mb-4">
    //               <label className="block text-gray-700">New Password</label>
    //               <input
    //                 type="password"
    //                 name="password"
    //                 value={formData.password}
    //                 onChange={handleChange}
    //                 required
    //                 className="w-full p-2 border rounded bg-gray-100"
    //               />
    //             </div>
    //             <div className="mb-4">
    //               <label className="block text-gray-700">Confirm New Password</label>
    //               <input
    //                 type="password"
    //                 name="confirmPassword"
    //                 value={confirmPassword}
    //                 onChange={(e) => setConfirmPassword(e.target.value)}
    //                 required
    //                 className="w-full p-2 border rounded bg-gray-100"
    //               />
    //             </div>
    //             {
    //               userId && (
    //                 <button
    //               type="button"
    //               className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
    //               onClick={() => handleUpdatePassword(userId)}
    //             >
    //               {userId ? "Update Password" : "Set Password"}
    //             </button>
    //               )
    //             }
    //           </form>
    //           {userId && (
    //             <div className="mt-6 border-t pt-4">
    //               <h3 className="text-lg font-semibold text-red-600">Delete Account</h3>
    //               <p className="text-gray-700">Once you delete your account, there is no going back. Please be certain.</p>
    //               <button className="mt-4 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-700">
    //                 Yes, Delete
    //               </button>
    //               <div className="mt-4 text-xs text-gray-500">
    //                 If you have trouble with the configuration, you can contact us. <a href="#" className="text-blue-500">We Can Help</a>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
