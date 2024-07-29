// const handleDelete = async () => {
//     try {
//         await fetch(`http://localhost:8080/v1/api/media/${configFormData.logo}`, {
//             method: "DELETE",
//         });
//         console.log("Image deleted successfully");
//         setConfigFormData((prev) => ({ ...prev, logo: null }));
//         localStorage.setItem("")
//     } catch (error) {
//         console.error("Error deleting image:", error);
//     }
// };


// const handleDelete = async () => {
//     try {

//         await axios.delete(`${endpointMediaUrl}/${configFormData.logo}`)                    // delete from media api
//         console.log("Image Deleted From Media API")

//         await axios.delete(`${endpointUrl}/${configFormData.logo}`)                         // delete from the configuration api

//         await axios.delete(`http://localhost:8080/v1/api/configuration/${configFormData.logo}`);
//         console.log("Image Deleted From Configuration API")

//         setConfigFormData((prev) => ({ ...prev, logo: null }))
//         localStorage.setItem("LogoPath", null);
//     }
//     catch (error) {
//         setError("Error in Delete Image")
//     }
// }
