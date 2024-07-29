"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcRules, FcManager, FcPortraitMode, FcOk } from "react-icons/fc";
import { HiOutlineX } from "react-icons/hi"
import Pagination from '@mui/material/Pagination';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation'
import { Input } from 'reactstrap';

import {
  Container,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  Button,
  MenuItem,
  InputLabel,
  Select,
  CardBody,
  FormHelperText,
  CircularProgress,
  Checkbox, FormControlLabel,
  IconButton,
  Alert,
  Grid, FormControl, Radio, RadioGroup, FormLabel,
  TextField, Modal, Box,
  InputGroup,
  Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";

import { Backend_Server_URL, Contest_endPoint, Media_endPoint, User_endPoint } from "@/components/configurationData/ConfigurationData";
const endpointUrl = `${Backend_Server_URL}/v1/api/`;


const ParticipantListTable = () => {
  const [participantsData, setParticipantsData] = useState([]);
  const [selectedparticipantsData, setSelectedParticipantsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const DataPerPage = 10;

  const handleCheckboxChange = (contestId) => {
    setSelectedParticipantsData((prevSelected) =>
      prevSelected.includes(contestId)
        ? prevSelected.filter((id) => id !== contestId)
        : [...prevSelected, contestId]
    );
  };

  // pagination
  const indexOfLastData = currentPage * DataPerPage;                     // currentPage = 1, DataPerPage = 10, index of last data = 1 *  10 = 10, next page data will be from 11 to - 20 and so on
  const indexOfFirstData = indexOfLastData - DataPerPage;
  const EachPageData = participantsData.slice(indexOfFirstData, indexOfLastData);
  const CountPage = Math.ceil(participantsData.length / DataPerPage)

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const TrTableData = ({ data }) => {
    const randomAvatar = () =>
      `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`;

    return (
      <tr>
        <td className="px-4 py-2 border">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(data.id)}
            checked={selectedparticipantsData.includes(data.id)}
            className="w-7 h-10"
          />
        </td>
        <td className="px-4 py-2 border">
          <img src={randomAvatar()} alt="Avatar" className="h-12 w-12 rounded-full mx-auto" />
        </td>
        {/* <td className="px-4 py-2 border">{data.name}</td> */}
        <td className="px-4 py-2 border">{data.firstName} {data.lastName}</td>
        <td className="px-4 py-2 border">{data.username}</td>
        <td className="px-4 py-2 border">{data.email}</td>
        <td className="px-4 py-2 border">{data.phone.phoneNumber}</td>
        <td className="px-4 py-2 border">{data.address.addressOne}</td>
      </tr>
    );
  };

  useEffect(() => {
    const FetchParticipantsData = async () => {
      try {
        const response = await axios.get(`${User_endPoint}/`);
        setParticipantsData(response.data);
      } catch (error) {
        console.error('Error fetching contest data:', error);
      }
    };

    FetchParticipantsData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* <div className="flex justify-center mb-3 mt-4">
        <div className="flex mb-4 w-1/2">
          <input
            placeholder="Search Participants"
            className="bg-white flex-grow p-2 border border-gray-300 rounded-full"
          />
        </div>
      </div> */}
      <div className="h-full border-b bg-gray-100">
        <table className="min-w-full bg-gray-100 shadow-md rounded-lg">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Select</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone No.</th>
              <th className="px-4 py-2 border">Address</th>
            </tr>
          </thead>
          <tbody>
            {EachPageData.map((data, index) => (
              <TrTableData key={index} data={data} />
            ))}
          </tbody>
        </table>
        <div className="flex justify-center my-5">
          <Pagination
            count={CountPage}
            page={currentPage}
            onChange={handlePageChange}
            color="primary" />
        </div>

      </div>

    </div>
  );
};

const BasicContest = ({ contestId, formData, setFormData, nextStep }) => {
  const [images, setImages] = useState([])

  const [videos, setVidoes] = useState("");
  const [price, setPrice] = useState([{ First: " ", Second: " " }]);
  const [rule, setRules] = useState([""])
  const [inputs, setInputs] = useState([{ First: " ", Second: " " }])
  const [modalOpen, setModalOpen] = useState(false)
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState([])

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');


  const toggleModal = () => setModalOpen(prevState => !prevState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleprizeinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...price];
    list[index][name] = value;
    setPrice(list);
  }

  const handleruleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...rule];
    list[index][name] = value;
    setRules(list);
  }

  const handleremoveprize = index => {
    const list = [...price];
    list.splice(index, 1);
    setPrice(list);
  }

  const handleremoverules = index => {
    const list = [...rule];
    list.splice(index, 1);
    setRules(list);
  }

  const handleAddPrize = () => {
    setPrice([...price, { First: " ", Second: "" }]);
  }


  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: type === 'checkbox' ? checked : value
  //   }))
  // }


  const handleDateChange = (name) => (date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }))
  }


  const handleArrayChange = (name, index, fields) => (e) => {
    const { value } = e.target;
    const NewArray = [...formData[name]]
    NewArray[index] = { ...NewArray[index], [fields]: value }
    setFormData(prev => ({
      ...prev,
      [name]: NewArray
    }))
  }

  const addNewItem = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: [...prev[name], {}]
    }))
  }



  // Tag
  const addNewTagItem = (field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: [...prevData[field], { name: '' }] // Initialize new tag with empty name
    }));
  };

  const handleDeleteTag = (index) => {
    setFormData(prevData => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index)
    }));
  };


  const handleTagArrayChange = (field, index, key) => (event) => {
    const { value } = event.target;
    setFormData(prevData => {
      const updatedArray = [...prevData[field]];
      updatedArray[index] = { ...updatedArray[index], [key]: value };
      return { ...prevData, [field]: updatedArray };
    });
  };

  const handleFileChange = (name) => (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      [name]: files,
    }));
  };


  // Prize

  const handleRemovePrize = (index) => () => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.filter((_, i) => i !== index),
    }));
  };


  // Rules 
  const handleAddRule = () => {
    setFormData(prev => ({
      ...prev,
      rules: [...prev.rules, ''],
    }));
  };

  const handleRemoveRule = (index) => () => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index),
    }));
  };

  const handleRuleChange = (index) => (e) => {
    const newRules = [...formData.rules];
    newRules[index] = e.target.value;
    setFormData(prev => ({
      ...prev,
      rules: newRules,
    }));
  };


  const handleAddRules = () => {
    setRules([...rule, { First: "" }]);
  }

  const HandleSocailInputChange = (e, index) => {
    const { name, value } = e.target;
    const inputlist = [...inputs];
    inputlist[index][name] = value;
    setInputs(inputlist)
  }

  const HandleAddSocialInputs = (index) => {
    setInputs([...inputs, { First: " ", Second: " " }])
  }

  const HandleDeleteSocial = (index) => {
    const inputlist = [...inputs]
    inputlist.splice(index, 1);
    setInputs(inputlist)
  }

  // Tag 
  const Tagcolors = [
    'bg-indigo-200 text-indigo-700',
    'bg-purple-200 text-purple-700',
    'bg-green-200 text-green-700',
    'bg-blue-200 text-blue-700',
    'bg-red-200 text-red-700',
    'bg-yellow-200 text-yellow-700',
    'bg-pink-200 text-pink-700',
    'bg-gray-200 text-gray-700'
  ];

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleDelete = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };



  //Contest Image &  Past Contest Image Uploads :

  const PastContestImageUpload = () => {
    const [previewSrc, setPreviewSrc] = useState('');

    const handleDragOver = (e) => {
      e.preventDefault();
      e.currentTarget.classList.add('border-indigo-600');
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove('border-indigo-600');
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove('border-indigo-600');
      const file = e.dataTransfer.files[0];
      displayPreview(file);
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      displayPreview(file);
    };

    const displayPreview = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewSrc(reader.result);
      };
    };

    return (
      <div
        className="w-[750px] relative border-2 border-gray-300 border-dashed rounded-lg p-6"
        id="dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          multiple
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 z-50"
          id="file-upload"
        // onChange={handleFileChange}
        // name="pastImages"
        // value={formData.pastImages}
        />
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt="Upload Icon"
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <label className="relative cursor-pointer">
              <span>Drag and drop</span>
              <span className="text-blue-600"> or browse</span>
              <span> to upload</span>
            </label>
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
        {previewSrc && (
          <img src={previewSrc} className="mt-4 mx-auto max-h-40" id="preview" />
        )}
      </div>
    );
  }

  const UploadImages = () => {
    const [images, setImages] = useState([]);
    const [type, setType] = useState('');
    const [thumbnailSize, setThumbnailSize] = useState('');

    // const handleImageChange = (e) => {
    //   const files = Array.from(e.target.files);
    //   setImages([...images, ...files]);
    // };

    const handleImageChange = (event) => {
      const files = Array.from(event.target.files);
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setFormData(prevData => ({
        ...prevData,
        images: [...prevData.images, ...newImages],
      }));
    };

    const handleRemoveImage = (index) => {
      setFormData(prevData => ({
        ...prevData,
        images: prevData.images.filter((_, i) => i !== index),
      }));
    };

    const AddBtnDiv = {
      width: '100px',
      height: '100px',
      borderRadius: '10px',
      border: '1px solid teal',
      margin: '10px',
      // display: 'inline-block',
      display: 'flex',
      justifyContent: "center",
    }

    const AddBtnLevel = {
      width: '100%',
      height: '100%',
      color: "teal",
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }

    return (
      <>
        <div className="container mx-auto p-4">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex flex-cols  gap-4 mb-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative inline-block w-24 h-24 m-2">
                  <img
                    // src={URL.createObjectURL(image)}
                    src={image.preview}
                    alt={`Image Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    className="absolute bottom-0 right-0 bg-red-500 text-white  rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    // onClick={() => setImages(images.filter((img, i) => i !== index))}
                    onClick={handleRemoveImage(index)}
                  >
                    <HiOutlineX />
                  </button>
                </div>
              ))}
            </div>

            <div className='flex justify-center'>
              <div style={AddBtnDiv}>
                <label style={AddBtnLevel} >
                  <i className="fa-fw fa fa-plus"></i>
                  Add More
                  <input id="upload-input" type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="type"
                      value="family_safe"
                      onChange={(e) => setType(e.target.value)}
                      checked={type === 'family_safe'}
                      className="mr-2"
                    />
                    Family Safe
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="type"
                      value="adult_content"
                      onChange={(e) => setType(e.target.value)}
                      checked={type === 'adult_content'}
                      className="mr-2"
                    />
                    Adult Content
                  </label>
                </div>
              </div>

              <div></div>

              <div>
                <label className="block text-sm font-medium mb-2">Thumbnail Size</label>
                <select
                  name="thumbnailSize"
                  id="thumbnailSize"
                  onChange={(e) => setThumbnailSize(e.target.value)}
                  value={thumbnailSize}
                  className="block w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="100x100">100x100 (Small)</option>
                  <option value="180x180">180x180 (Standard)</option>
                  <option value="250x250">250x250 (Large)</option>
                  <option value="300x300">300x300 (Extra Large)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Past Contest Reference Modal +  PastContestReferenceTable // Global Comp
  const PastContestReferenceTable = () => {
    const [contests, setContests] = useState([]);
    const [selectedContests, setSelectedContests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const DataPerPage = 10;

    const handleCheckboxChange = (contestId) => {
      setSelectedContests((prevSelected) =>
        prevSelected.includes(contestId)
          ? prevSelected.filter((id) => id !== contestId)
          : [...prevSelected, contestId]
      );
    };

    // pagination
    const indexOfLastData = currentPage * DataPerPage;                     // currentPage = 1, DataPerPage = 10, index of last data = 1 *  10 = 10, next page data will be from 11 to - 20 and so on
    const indexOfFirstData = indexOfLastData - DataPerPage;
    const EachPageData = contests.slice(indexOfFirstData, indexOfLastData);
    const CountPage = Math.ceil(contests.length / DataPerPage)

    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };

    const TrTableData = ({ contest }) => {
      const randomAvatar = () =>
        `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`;

      return (
        <tr>
          <td className="px-4 py-2 border">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(contest.id)}
              checked={selectedContests.includes(contest.id)}
              className="w-7 h-10"
            />
          </td>
          <td className="px-4 py-2 border">
            <img src={randomAvatar()} alt="Avatar" className="h-12 w-12 rounded-full mx-auto" />
          </td>
          {/* <td className="px-4 py-2 border">{contest.name}</td> */}
          <td className="px-4 py-2 border">{contest.name}</td>
          <td className="px-4 py-2 border">{contest.description}</td>
          <td className="px-4 py-2 border">{contest.createdBy}</td>
          <td className="px-4 py-2 border">{contest.startDate}</td>
          <td className="px-4 py-2 border">{contest.finishDate}</td>
        </tr>
      );
    };

    useEffect(() => {
      const fetchContests = async () => {
        try {
          const response = await axios.get(`${Contest_endPoint}`);
          setContests(response.data);
        } catch (error) {
          console.error('Error fetching contest data:', error);
        }
      };

      fetchContests();
    }, []);

    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center mb-3 mt-4">
          <div className="flex mb-4 w-1/2">
            <input
              placeholder="Search for..."
              className="bg-white flex-grow p-2 border border-gray-300 rounded-full"
            />
          </div>
        </div>
        <div className="h-full border-b bg-gray-100">
          <table className="min-w-full bg-gray-100 shadow-md rounded-lg">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Select</th>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Contest Name</th>
                <th className="px-4 py-2 border">Contest Description</th>
                <th className="px-4 py-2 border">Organised By</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">Finish Date</th>
              </tr>
            </thead>
            <tbody>
              {EachPageData.map((contest, index) => (
                <TrTableData key={index} contest={contest} />
              ))}
            </tbody>
          </table>
          <div className="flex justify-center my-5">
            <Pagination
              count={CountPage}
              page={currentPage}
              onChange={handlePageChange}
              color="primary" />
          </div>

        </div>

      </div>
    );
  };

  return (
    <>
      <Container className="mt-10">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="mb-3">
              <CardContent className="p-10">
                <div className="flex flex-wrap -mt-2 -ml-2 mb-10">
                  <p variant="h6">Basic Details</p>
                  <span className="ml-auto text-sm">
                    Fields marked with <span className="text-red-500">*</span> are required.
                  </span>
                </div>
                <form>
                  <Grid container spacing={2} className="py-5">

                    <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                      <Grid item xs={12} sm={3}>
                        <InputLabel className="block ml-5">Contest Name :</InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Contest Name"
                          placeholder="Enter Contest Name"
                          className="bg-[#F9FAFC]"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>


                    <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                      <Grid item xs={12} sm={3}>
                        <InputLabel className="block ml-5">Contest Description :</InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Contest Description"
                          placeholder="Enter Contest Description"
                          className="bg-[#F9FAFC]"
                          name="description"
                          type="textarea"
                          value={formData.description}
                          onChange={handleChange}
                          multiline
                          rows={3}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                      <Grid item xs={12} sm={3}>
                        <InputLabel className="block ml-5">Contest Organised By :</InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Contest Organised By"
                          placeholder="Enter Contest Organiser Name"
                          className="bg-[#F9FAFC]"
                          name="createdBy"
                          type="text"
                          value={formData.createdBy}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                      <Grid xs={12} sm={3}>
                        <InputLabel className="block ml-10"> Time Line :</InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          size="small"
                          className="bg-[#F9FAFC]"
                          label="Start Date"
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item sm={5}>
                        <TextField
                          fullWidth
                          size="small"
                          className="bg-[#F9FAFC]"
                          label="Finish Date"
                          type="date"
                          name="finishDate"
                          value={formData.finishDate}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                          }}

                        />
                      </Grid>
                    </Grid>


                    {/* Upload Image */}
                    <Grid container spacing={2} alignItems="center" className="mt-5">
                      <Grid item xs={3}>
                        <InputLabel className="ml-5">Upload Image :</InputLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <UploadImages />
                      </Grid>
                    </Grid>


                    {/* Video Player will goes here */}
                    <Grid container spacing={2} alignItems="center" className="mt-3 mb-5">
                      <Grid item xs={12} sm={3}>
                        <InputLabel className="ml-5">Upload Video Link :</InputLabel>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <TextField
                          fullWidth
                          className="bg-[#F9FAFC]"
                          size="small"
                          label="Video Link"
                          name="videos"
                          value={formData.videos}
                          onChange={handleChange}
                          placeholder="Enter Video link"
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        {
                          videos && (
                            <>
                              <ReactPlayer height="200px" width="300px" url={videos} controls />
                            </>
                          )
                        }
                      </Grid>
                    </Grid>


                    {/* AssetType */}
                    <Grid container spacing={2} alignItems="center" className="mt-5">
                      <Grid item xs={12} sm={3} >
                        <InputLabel className="ml-5"> Asset Type : </InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div>
                          <select
                            name="assetType"
                            value={formData.assetType}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full bg-[#F9FAFC] rounded-lg focus:outline-none focus:border-blue-900"
                          >
                            <option>Select Asset Type</option>
                            <option value="PICTURE">Picture</option>
                            <option value="VIDEO">Video</option>
                            <option value="AUDIO">Audio</option>
                          </select>
                        </div>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems="center" className="mt-2">
                      <Grid item xs={12} sm={3}>
                        <InputLabel className="ml-5">Max Asset Size : </InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          fullWidth
                          className="bg-[#F9FAFC]"
                          size="small"
                          label="Max Asset size"
                          name="maxAssetSize"
                          value={formData.maxAssetSize}
                          onChange={handleChange}
                          placeholder="Enter Max Asset Size"
                          type="number"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                      <Grid item xs={12} sm={3}>
                        <InputLabel className="ml-5">Max Asset Size Unit : </InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          fullWidth
                          className="bg-[#F9FAFC]"
                          size="small"
                          label="Max asset size unit"
                          name="maxAssetSizeUnit"
                          value={formData.maxAssetSizeUnit}
                          onChange={handleChange}
                          placeholder="Enter Max Asset Size Unit"
                          type="text"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} className="mb-2 mt-1">
                      <Grid item xs={12} sm={3}>
                        <InputLabel className="ml-5">Copy Rights : </InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          fullWidth
                          className="bg-[#F9FAFC]"
                          size="small"
                          label="Copy Rights"
                          name="copyRights"
                          value={formData.copyRights}
                          onChange={handleChange}
                          placeholder="Enter Copy Rights"
                          type="text"
                          multiline
                          rows={3}
                        />
                      </Grid>
                    </Grid>

                    {/* visibility */}
                    <Grid item xs={12} sm={3}>
                      <InputLabel className="ml-2">Contest Visibility:</InputLabel>
                    </Grid>

                    <Grid item xs={12} sm={6} className="-mt-2">
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="contest-visibility"
                          name="visibility"
                          value={formData.visibility}
                          onChange={handleChange}
                          className="-ml-3 "
                        >
                          <FormControlLabel
                            value="Private"
                            control={<Radio />}
                            label="Private"
                          />
                          <FormControlLabel
                            value="Public"
                            control={<Radio />}
                            label="Public"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>


                    {/* Prizes */}
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3}>
                        <InputLabel className="ml-5">Add Prize:</InputLabel>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                          onClick={() => addNewItem('prizes')}
                        >
                          Add
                        </Button>
                      </Grid>
                      <Grid item xs={7}>
                        {formData.prizes.map((prize, i) => (
                          <Grid container spacing={2} key={i} alignItems="center">
                            <Grid item xs={4}>
                              <TextField
                                type="text"
                                placeholder="Enter Prize"
                                fullWidth
                                className="bg-[#F9FAFC]"
                                size="small"
                                label={`Prize Name ${i + 1}`}
                                name="prizes"
                                value={prize.name || ''}
                                onChange={handleArrayChange('prizes', i, 'name')}
                                autoFocus
                              />
                            </Grid>
                            <Grid item xs={5}>
                              <TextField
                                type="text"
                                placeholder="Enter Prize Description"
                                fullWidth
                                className="bg-[#F9FAFC]"
                                size="small"
                                name="prizes"
                                label={`Prize Description ${i + 1}`}
                                variant="outlined"
                                onChange={handleArrayChange('prizes', i, 'description')}
                                value={prize.description || ''}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              {prize.length !== 1 && (
                                <button
                                  type="button"
                                  className="px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-700"
                                  onClick={handleRemovePrize(i)}
                                >
                                  x
                                </button>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>


                    {/* Rule */}
                    <Grid container spacing={2} alignItems="center" className="mt-2">
                      <Grid item xs={3}>
                        <InputLabel className="ml-5">Add Rules:</InputLabel>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                          onClick={handleAddRule}
                        >
                          Add
                        </Button>
                      </Grid>
                      <Grid item xs={7}>
                        {formData.rules.map((rule, i) => (
                          <Grid container spacing={2} key={i} alignItems="center">
                            <Grid item xs={9}>
                              <TextField
                                type="text"
                                placeholder="Enter Rule"
                                className="bg-[#F9FAFC]"
                                fullWidth
                                size="small"
                                label={`Rule ${i + 1}`}
                                name="rules"
                                value={rule}
                                onChange={handleRuleChange(i)}
                                autoFocus
                              />
                            </Grid>
                            <Grid item xs={3}>
                              {rule.length !== 1 && (
                                <button
                                  type="button"
                                  className="px-4  py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-700"
                                  onClick={handleRemoveRule(i)}
                                >
                                  x
                                </button>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>


                    {/* SocialMedia */}
                    <Grid container spacing={2} alignItems="center" className="mt-2 mb-2">
                      <Grid item xs={3}>
                        <InputLabel className="ml-5">Social Media:</InputLabel>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          type="button"
                          className="bg-blue-500 text-white rounded hover:bg-blue-700"
                          onClick={() => addNewItem('socialMedia')}
                        >
                          Add
                        </Button>
                      </Grid>

                      <Grid item xs={7}>
                        {formData.socialMedia.map((social, i) => (
                          <Grid container spacing={2} key={i} alignItems="center">
                            <Grid item xs={4}>
                              <select
                                type="select"
                                name="socialMedia"
                                value={social.socialMediaName || ''}
                                onChange={handleArrayChange('socialMedia', i, 'socialMediaName')}
                                className="border border-gray-300 p-2 w-full bg-[#F9FAFC] rounded-lg focus:outline-none focus:border-blue-900"
                              >
                                <option>Select Social Media</option>
                                <option value="LINKEDIN">Linkedin</option>
                                <option value="FACEBOOK">Facebook</option>
                                <option value="TWITTER">Twitter</option>
                                <option value="INSTAGRAM">Instagram</option>
                              </select>
                            </Grid>
                            <Grid item xs={5}>
                              <TextField
                                name="socialMedia"
                                label={`Link ${i + 1}`}
                                variant="outlined"
                                fullWidth
                                onChange={handleArrayChange('socialMedia', i, 'link')}
                                value={social.link || ''}
                                className="bg-[#F9FAFC]"
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={3}>
                              {social.length !== 1 && (
                                <button
                                  type="button"
                                  className="px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-700"
                                  onClick={() => HandleDeleteSocial(i)}
                                >
                                  x
                                </button>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    {/* Tags */}
                    {/* <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3}>
                        <InputLabel className="ml-5">Tags:</InputLabel>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          type="button"
                          className="bg-blue-500 text-white rounded hover:bg-blue-700"
                          onClick={() => addNewTagItem('tags')}
                        >
                          Add
                        </Button>
                      </Grid>

                      <Grid item xs={7}>
                        {formData.tags.map((tag, index) => (
                          <Grid container spacing={2} key={index} alignItems="center">
                            <Grid item xs={9}>
                              <TextField
                                name={`tags[${index}]`}
                                label={`Tag Name ${index + 1}`}
                                variant="outlined"
                                fullWidth
                                onChange={handleTagArrayChange('tags', index, 'name')}
                                value={tag.name || ''}
                                type="text"
                                className="bg-[#F9FAFC]"
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={3}>
                              {tag.length !== 1 && (
                                <button
                                  type="button"
                                  className="px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-700"
                                  onClick={() => handleDeleteTag(index)}
                                >
                                  x
                                </button>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>

                    </Grid> */}

                    {/* <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3}>
                        <InputLabel className="ml-5">Add Tag:</InputLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <div className="flex items-center space-x-2">
                          <TextField
                            type="text"
                            // value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            fullWidth
                            className="bg-[#F9FAFC]"
                            size="small"
                            label="Add Tag"
                            name="tags.name"
                            value={formData.tags.name}
                            placeholder="Add Tag"
                          />
                          <Button
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                            onClick={handleAddTag}
                          >
                            Add
                          </Button>
                        </div>
                        <div className="mt-2">
                          {tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`inline-block rounded px-2 mr-2 mb-2 ${Tagcolors[index % Tagcolors.length]}`}
                            >
                              {tag}
                              <span
                                className="ml-2 cursor-pointer text-red-500"
                                onClick={() => handleDelete(index)}
                              >
                                x
                              </span>
                            </span>
                          ))}
                        </div>
                      </Grid>
                    </Grid> */}

                    {/* Past Contest Refercene */}
                    <Grid container spacing={2} alignItems="center" className="my-4">
                      <Grid item xs={3}>
                        <InputLabel className="ml-5">Past Contest Reference:</InputLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <Button variant="contained" color="primary" onClick={toggleModal}>
                          Add
                        </Button>
                      </Grid>
                    </Grid>

                    {/* Contest List Table Open */}
                    <Dialog
                      open={modalOpen}
                      onClose={toggleModal}
                      fullWidth
                      maxWidth="lg"
                    >
                      <DialogTitle>Select Contest</DialogTitle>
                      <DialogContent>
                        <PastContestReferenceTable />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          color="inherit"
                          onClick={toggleModal}
                          className="text-primary"
                        >
                          Cancel
                        </Button>
                        <Button
                          color="primary"
                          onClick={toggleModal}
                        >
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* Past Contest Image Upload */}

                    <Grid container spacing={2} alignItems="center" className="mt-5">
                      <Grid item xs={3}>
                        <InputLabel className="ml-5">Past Contest Picture:</InputLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <PastContestImageUpload />
                      </Grid>
                    </Grid>

                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

const Participants = ({ contestId, formData, setFormData, nextStep }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(prevState => !prevState);

  const HandleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const RenderInput = ({ selectedOption }) => {
    if (selectedOption === "email") {
      return <TextField
        type="email"
        label="Enter Email here"
        variant="outlined"
        fullWidth
        className="mt-2 bg-[#F9FAFC]"
        size="small"
        name="paticipantsemail"
        value={formData.paticipantsemail}
        placeholder="Enter Participant Email"
        multiline
      />
    }
    else if (selectedOption === 'browse') {
      return (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleModal}
            className="mt-2"
          >
            Add
          </Button>
          <Dialog
            open={modalOpen}
            onClose={toggleModal}
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle>Select User</DialogTitle>
            <DialogContent>

              <ParticipantListTable />

            </DialogContent>
            <DialogActions>
              <Button
                color="inherit"
                onClick={toggleModal}
                className="text-primary"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={toggleModal}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    } else return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Container className="mt-10">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className="mb-3">
            <CardContent className="p-10">
              <div className="flex flex-wrap -mt-2 -ml-2 mb-10">
                <p variant="h6">Participants Details</p>
                <span className="ml-auto text-sm">
                  Fields marked with <span className="text-red-500">*</span> are required.
                </span>
              </div>
              <form>
                <Grid container spacing={2} className="py-5">

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel className="block">
                        Upload Participants List:
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <FormControl fullWidth variant="outlined">
                        <Input
                          id="addCv"
                          type="file"
                          // name="customFile"
                          className="border-gray-300 rounded-md border-2"
                          name="participants"
                        // value={formData.participants}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel className="block">
                        Participants Rights :
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        fullWidth
                        className="bg-[#F9FAFC]"
                        size="small"
                        label="Participants Right"
                        name="participantsRight"
                        value={formData.participantsRight}
                        onChange={handleChange}
                        placeholder="Enter Participant Rights"
                        multiline
                        type="textarea"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel className="block">
                        Participants Max Assest Size :
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        fullWidth
                        className="bg-[#F9FAFC]"
                        size="small"
                        label="Max Assets Size"
                        name="participantMaxAssetSize"
                        value={formData.participantMaxAssetSize}
                        onChange={handleChange}
                        placeholder="Enter Participant Rights"
                        multiline
                        type="text"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel className="block">
                        Participants Max Assest Size Unit :
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        fullWidth
                        className="bg-[#F9FAFC]"
                        size="small"
                        label="Max Assets Size Unit"
                        name="participantMaxAssetSizeUnit"
                        value={formData.participantMaxAssetSizeUnit}
                        onChange={handleChange}
                        placeholder="Enter Participant Max Asset Size Unit"
                        multiline
                        type="text"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel className="block">
                        Participants Max Asset Allowed:
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        fullWidth
                        className="bg-[#F9FAFC]"
                        size="small"
                        label="Max Assets Allowed"
                        name="participantMaxAssetAllowed"
                        value={formData.participantMaxAssetAllowed}
                        onChange={handleChange}
                        placeholder="Enter Participant Max Asset Allowed"
                        multiline
                        type="textarea"
                      />
                    </Grid>
                  </Grid>


                  <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel className="block">
                        Thank You Message :
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        fullWidth
                        className="bg-[#F9FAFC]"
                        size="small"
                        label="Thank You Message "
                        name="participantThankyouMessage"
                        value={formData.participantThankyouMessage}
                        placeholder="EnterThank You Message"
                        onChange={handleChange}
                        multiline
                        type="textarea"
                      />
                    </Grid>
                  </Grid>


                  <Grid container spacing={2} alignItems="center" className="mt-3">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel className="block">
                        Participants :
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Select</InputLabel>
                        <Select
                          id="participants-dropdown"
                          value={selectedOption}
                          onChange={(e) => HandleOptionSelect(e.target.value)}
                          label="Select"
                          className="bg-[#F9FAFC]"
                          size="small"

                        >
                          <MenuItem value="email">Email</MenuItem>
                          <MenuItem value="browse">Browse from the tool</MenuItem>
                          <MenuItem value="open">Open to All</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RenderInput selectedOption={selectedOption} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel className="block">
                        List of Existing Participants :
                      </InputLabel>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                    <ParticipantListTable />
                  </Grid>

                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>

  )
}

const Judge = ({ contestId, formData, setFormData, submitForm, nextStep }) => {
  const [selectRatingOptions, setRatingOptions] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(prevState => !prevState);


  const HandleRatingOptions = (options) => {
    setRatingOptions(options)
  }


  const HandleOptionSelect = (option) => {
    setSelectedOption(option)
  }


  const RenderInput = ({ selectedOption }) => {
    if (selectedOption === "email") {
      return <TextField
        type="email"
        label="Enter Email here"
        variant="outlined"
        fullWidth
        className="mt-2 bg-[#F9FAFC]"
        size="small"
        name="paticipantsemail"
        value={formData.paticipantsemail}
        placeholder="Enter Participant Email"
        multiline
      />
    }
    else if (selectedOption === 'browse') {
      return (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleModal}
            className="mt-2"
          >
            Add
          </Button>
          <Dialog
            open={modalOpen}
            onClose={toggleModal}
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle>Select User</DialogTitle>
            <DialogContent>

              <ParticipantListTable />

            </DialogContent>
            <DialogActions>
              <Button
                color="inherit"
                onClick={toggleModal}
                className="text-primary"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={toggleModal}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    } else return null;
  }

  const RenderRatingInput = ({ selectRatingOptions }) => {
    if (selectRatingOptions === "rating") {
      return (
        <div className="flex gap-10">
          <TextField
            type="text"
            label="Enter Rating Criteria"
            variant="outlined"
            fullWidth
            className="mt-2 bg-[#F9FAFC]"
            size="small"
            name="ratingCriteria"
            value={formData.ratings.ratingCriteria}
            placeholder="Enter Rating Criteria"
            multiline
          />
          <TextField
            label="Enter Rating Weightage"
            variant="outlined"
            fullWidth
            name="weightage"
            type="number"
            value={formData.ratings.weightage}
            className="mt-2 bg-[#F9FAFC]"
            size="small"
            placeholder="Rating Weightage"
          />
        </div>
      )
    }
    else return null;
  }


  return (
    <Container className="mt-10">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className="mb-3">
            <CardContent className="p-10">
              <div className="flex flex-wrap -mt-2 -ml-2 mb-10">
                <p variant="h6">Judge Details</p>
                <span className="ml-auto text-sm">
                  Fields marked with <span className="text-red-500">*</span> are required.
                </span>
              </div>
              <form>
                <Grid container spacing={2} className="py-5">
                  <Grid container spacing={2} alignItems="center" className="mt-3">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel>
                        Rating Criteria :
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Select</InputLabel>
                        <Select
                          id="participants-dropdown"
                          value={selectRatingOptions}
                          // value={formData.ratingCriteria}
                          onChange={(e) => HandleRatingOptions(e.target.value)}
                          label="Select"
                          className="bg-[#F9FAFC]"
                          size="small"
                        >
                          <MenuItem value="rating">Rating</MenuItem>
                          <MenuItem value="THUMBS_SIGN">Thums-Up/Down</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RenderRatingInput selectRatingOptions={selectRatingOptions} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" className="mt-3">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel className="block">
                        Participants :
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Select</InputLabel>
                        <Select
                          id="participants-dropdown"
                          value={selectedOption}
                          onChange={(e) => HandleOptionSelect(e.target.value)}
                          label="Select"
                          className="bg-[#F9FAFC]"
                          size="small"

                        >
                          <MenuItem value="email">Email</MenuItem>
                          <MenuItem value="browse">Browse from the tool</MenuItem>
                          <MenuItem value="open">Open to All</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RenderInput selectedOption={selectedOption} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                    <Grid item xs={12} sm={3} className="text-right">
                      <InputLabel className="block">
                        List of Existing Judges :
                      </InputLabel>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" className="mt-1 mb-1">
                    <ParticipantListTable />
                  </Grid>

                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

const Report = () => {
  return (
    <Container className="mt-10">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className="mb-3">
            <CardContent className="p-10">
              <Grid container spacing={2} className="py-5">
                <ParticipantListTable />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

const ContestWizard = ({ params }) => {
  const createMode = params.contestId == 0              //true 
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    createdBy: '',
    images: [],
    videos: [],
    startDate: "",
    finishDate: "",
    assetType: '',
    tags: [],
    socialMedia: [],
    pastReference: [],
    pastImages: [],
    pastVideos: [],
    maxAssetSize: 0,
    maxAssetSizeUnit: '',
    visibility: '',
    rules: [],
    copyRights: '',
    prizes: [],
    participants: [],
    participantsRight: '',
    participantMaxAssetSize: '',
    participantMaxAssetSizeUnit: '',
    participantMaxAssetAllowed: '',
    participantThankyouMessage: '',
    judges: [],
    ratingCriteria: '',
    ratings: [],
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Function to send data to a specific API endpoint
    const sendDataToApi = async (url, data, method) => {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    };

    try {
      // Handle images and videos
      await Promise.all([
        ...formData.images.map(image => sendDataToApi(`${Media_endPoint}`, image, 'POST')),
        ...formData.videos.map(video => sendDataToApi(`${Media_endPoint}`, video, 'POST')),
        ...formData.pastImages.map(image => sendDataToApi(`${Media_endPoint}`, image, 'POST')),
        ...formData.pastVideos.map(video => sendDataToApi(`${Media_endPoint}`, video, 'POST')),
      ]);

      // Handle tags
      await Promise.all(formData.tags.map(tag => sendDataToApi(`${endpointUrl}/tag`, tag, 'POST')));

      // Handle participants and judges
      await Promise.all([
        ...formData.participants.map(participant => sendDataToApi(`${User_endPoint}`, participant, 'POST')),
        ...formData.judges.map(judge => sendDataToApi(`${User_endPoint}`, judge, 'POST')),
      ]);

      // Determine API endpoint and method based on edit or create
      const contestEndpoint = params.contestId && !createMode ? `${Contest_endPoint}${params.contestId}` : `${Contest_endPoint}`;
      const method = params.contestId && !createMode ? 'PUT' : 'POST';

      // Send final form data
      await sendDataToApi(contestEndpoint, formData, method);
      console.log("Form data submitted:", formData);

      // Redirect after successful submission
      router.push("/admin/contest");

    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data.');
    }
  };

  useEffect(() => {
    if (params.contestId && !createMode) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${Contest_endPoint}${params.contestId}`
          );
          const contest = response.data;
          console.log("Contest Edit", contest)
          setFormData(contest);
        } catch (err) {
          console.log("Error in Fetch Api at Edit User", err);
        }
      };
      fetchUserData();
    }
  }, [params.contestId]);


  const steps = [
    { label: 'Basic Contest', icon: <FcRules className="h-7 w-10 mr-2" /> },
    { label: 'Participants', icon: <FcManager className="h-7 w-10 mr-2" /> },
    { label: 'Judge', icon: <FcPortraitMode className="h-7 w-10 mr-2" /> },
    // { label: 'Reports', icon: <FcRatings className="h-7 w-10 mr-2" /> },
  ];

  const Step = ({ label, isActive, isCompleted, icon, onClick }) => (
    <div className={`flex items-center cursor-pointer ${isActive ? 'text-blue-500' : 'text-gray-500'}`}
      onClick={onClick}>
      {isCompleted ? <FcOk className="h-7 w-10 mr-2" /> : icon}
      <span className="hidden sm:inline">{label}</span>
    </div>
  );

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const isComplete = (step) => step < currentStep;
  const handleStepClick = (stepIndex) => setCurrentStep(stepIndex);


  return (
    <div className="sm:px-6 w-[1240px] m-auto">
      <div className="mt-20 px-4">
        <div className=" m-auto border border-gray-100 p-8">
          <div className="flex justify-center gap-4 mb-20 mt-10 flex-wrap">
            {steps.map((step, index) => (
              <Step
                key={step.label}
                label={step.label}
                isActive={index === currentStep}
                isCompleted={isComplete(index)}
                icon={step.icon}
                onClick={() => handleStepClick(index)}
              />
            ))}
          </div>

          {currentStep === 0 && <BasicContest contestId={params.contestId && !createMode} formData={formData} setFormData={setFormData} nextStep={nextStep} />}
          {currentStep === 1 && <Participants contestId={params.contestId && !createMode} formData={formData} setFormData={setFormData} nextStep={nextStep} />}
          {currentStep === 2 && <Judge contestId={params.contestId && !createMode} formData={formData} setFormData={setFormData} nextStep={nextStep} />}
          {/* {currentStep === 3 && <Report />} */}

          <div className="flex justify-center mt-3 gap-10">
            {currentStep > 0 && (
              <Button
                onClick={prevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                {/* {createMode ? 'Create Contest' : 'Update Contest'} */}
                {/* Submit */}
                {params.contestId && !createMode ? "Update Contest" : "Create Contest"}
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                onClick={nextStep}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestWizard;

