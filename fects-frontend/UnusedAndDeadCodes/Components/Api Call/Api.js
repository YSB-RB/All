  // const handleImageChange = async (e) => {
  //   const image = e.target.files[0];
  // try {
  //   const imageData = new FormData();
  //   imageData.append("image", image);

  //   const response = await axios.post("http://localhost:8080/v1/api/media", imageData);
  //   console.log("Image uploaded:", response.data);

  //   setFormData({ ...formData, images: [response.data] });             // set the image to formData
  //   setProfilePic(URL.createObjectURL(image))                        // for image preview
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     throw error;
  //   }
  // };
