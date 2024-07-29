"use client"

import React, { useState, useEffect, useRef } from "react";
import HeaderMain from "@/components/HeaderMain/HeaderMain";
import axios, { all } from "axios";
import { FcPlus, FcOk } from "react-icons/fc";
import { CheckIcon, UserIcon, KeyIcon, CogIcon, XCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation'
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CardBody,
  FormHelperText,
  CircularProgress,
  Checkbox, FormControlLabel,
  IconButton,
  Alert,
} from "@mui/material";



const ProfileHeader = ({ userData }) => {
  const { images, firstName, lastName, email } = userData;

  return (
    <Card className="mb-4">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} className="text-center">
            {images.length > 0 ? (
              <img
                src={images[0].url}
                alt={`${firstName} ${lastName}`}
                className="w-40 h-40 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto" />
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" className="mb-2">{`${firstName} ${lastName}`}</Typography>
            <Typography variant="subtitle1" className="text-gray-500">
              {email}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const BasicDetails = ({ userId, formData, setFormData, nextStep }) => {
  const [profilePic, setProfilePic] = useState(null)
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState("");
  const [availability, setAvailability] = useState(null);
  let typingTimer;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Check username availability
  const checkAvailability = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/usernameExists/${username}`
      );
      const data = await response.json();
      setAvailability(data ? "Username already exists" : "Username is available");
    } catch (error) {
      console.error("Error checking username availability:", error);
    }
  };

  const HandleCheckUsername = (e) => {
    const { value } = e.target;
    clearTimeout(typingTimer);
    setUsername(value);
    typingTimer = setTimeout(() => {
      checkAvailability(value);
    }, 2000);
    setAvailability(null);
    setFormData({
      ...formData,
      username: value,
    });
  };

  return (
    <Container className="mt-10">
      <Grid container spacing={3}>
        {/* {userId && (
          <Grid item xs={12}>
            <ProfileHeader userData={formData} />
          </Grid>
        )} */}
        <Grid item xs={12}>
          <Card className="mb-3">
            <CardContent className="p-10">
              <div className="flex flex-wrap -mt-2 -ml-2">
                <p variant="h6">Basic Details</p>
                <span className="ml-auto text-sm">
                  Fields marked with <span className="text-red-500">*</span> are required.
                </span>
              </div>
              <form>
                <div className="flex items-center justify-center mt-10">
                  <div className="flex items-center space-x-6 mb-6">
                    <div
                      className="w-20 h-20 md:w-30 md:h-30 lg:w-30 lg:h-30 rounded-full overflow-hidden shadow-md cursor-pointer"
                      onClick={handleImageClick}>
                      {profilePic ? (
                        <img
                          src={profilePic}
                          alt="Profile"
                          className="w-full h-full object-cover"
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
                      className="hidden"
                    />
                  </div>
                </div>
                <Grid container spacing={2} className="py-5">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="bg-[#F9FAFC]"
                      fullWidth
                      size="small"
                      required
                      label="Name"
                      name="firstName"
                      onChange={handleChange}
                      placeholder="Enter Name"
                      value={formData.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      className="bg-[#F9FAFC]"
                      required
                      label="Email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Enter Email"
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      value={formData.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      className="bg-[#F9FAFC]"
                      required
                      label="Username"
                      name="username"
                      onChange={HandleCheckUsername}
                      placeholder="Enter Username"
                      error={Boolean(errors.username)}
                      helperText={errors.username}
                      value={formData.username}
                    />
                    {/* {availability && (
                      <FormHelperText className='text-blue-500'>{availability}</FormHelperText>
                    )} */}

                    {availability && <FormHelperText className='text-blue-500'>{availability}</FormHelperText>}
                    {errors.username && (
                      <FormHelperText className='text-red-500'>{errors.username}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="mb-4">
                      <select
                        id="gender"
                        name="gender"
                        className="border border-gray-300 p-2 w-full bg-[#F9FAFC] rounded-lg focus:outline-none focus:border-blue-900"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      className="bg-[#F9FAFC]"
                      label="Birth Date"
                      type="date"
                      name="birthdate"
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formData.birthdate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="mb-4">
                      <select
                        id="maritalStatus"
                        name="maritalStatus"
                        className="border border-gray-300 p-2 w-full bg-[#F9FAFC] rounded-lg focus:outline-none focus:border-blue-900"
                        required
                        value={formData.maritalStatus}
                        onChange={handleChange}
                      >
                        <option value="">Select MaritalStatus</option>
                        <option value="MARRIED">Married</option>
                        <option value="SINGLE">Single</option>
                        <option value="DIVORCED">Divorced</option>
                        <option value="WIDOW">Widow</option>
                      </select>
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      className="bg-[#F9FAFC]"
                      size="small"
                      label="Address One"
                      name="addressOne"
                      value={formData.address.addressOne}
                      onChange={handleChange}
                      placeholder="Enter First Address"
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          size="small"
                          className="bg-[#F9FAFC]"
                          fullWidth
                          label="Country"
                          name="country"
                          onChange={handleChange}
                          placeholder="Enter Country"
                          value={formData.country}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          className="bg-[#F9FAFC]"
                          fullWidth
                          size="small"
                          label="County"
                          name="county"
                          onChange={handleChange}
                          placeholder="Enter County"
                          value={formData.address.county}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          className="bg-[#F9FAFC]"
                          size="small"
                          label="Street"
                          name="street"
                          onChange={handleChange}
                          placeholder="Enter Street"
                          value={formData.address.street}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          size="small"
                          className="bg-[#F9FAFC]"
                          fullWidth
                          label="Apt / Suite / Other"
                          name="apt"
                          onChange={handleChange}
                          placeholder="Enter Apt/Suite/Other"
                          value={formData.apt}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          size="small"
                          className="bg-[#F9FAFC]"
                          fullWidth
                          label="Zip Code"
                          name="zipCode"
                          onChange={handleChange}
                          placeholder="Enter Zip Code"
                          value={formData.zipCode}

                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          className="bg-[#F9FAFC]"
                          size="small"
                          label="City"
                          name="city"
                          onChange={handleChange}
                          placeholder="Enter City"
                          value={formData.city}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          className="bg-[#F9FAFC]"
                          size="small"
                          label="State"
                          name="state"
                          onChange={handleChange}
                          placeholder="Enter State"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="mb-4">
                      <select
                        id="maritalStatus"
                        name="phoneType"
                        className="border border-gray-300 p-2 w-full bg-[#F9FAFC] rounded-lg focus:outline-none focus:border-blue-900"
                        required
                        value={formData.phoneType}
                        onChange={handleChange}
                      >
                        <option value="">Select Phone Type</option>
                        <option value="MOBILE">MOBILE</option>
                        <option value="LANDLINE">LANDLINE</option>
                      </select>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="bg-[#F9FAFC]"
                      size="small"
                      fullWidth
                      label="Phone Number"
                      type="number"
                      name="phoneNumber"
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      value={formData.phoneNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="mb-4">
                      <select
                        id="maritalStatus"
                        name="status"
                        className="border border-gray-300 p-2 w-full bg-[#F9FAFC] rounded-lg focus:outline-none focus:border-blue-900"
                        required
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="mb-4">
                      <select
                        id="maritalStatus"
                        name="role"
                        className="border border-gray-300 p-2 w-full bg-[#F9FAFC] rounded-lg focus:outline-none focus:border-blue-900"
                        required
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="">Select Role</option>
                        <option value="ADMIN_ROLE">Admin</option>
                        <option value="USER_ROLE">User</option>
                      </select>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const AccountDetails = ({
  userId,
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  return (
    <Container className="mt-5 flex justify-between">
      <Grid container spacing={3}>
        {/* {userId && (
          <Grid item xs={12}>
            <ProfileHeader userData={formData} />
          </Grid>
        )} */}
        <Grid item xs={12} className="mt-10">
          <div className="mb-4 p-6 shadow-md rounded-lg bg-white">
            <div className="mb-4 text-xl font-semibold">Account Details</div>
            <div>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="tokenExpired"
                  className="form-checkbox text-primary w-5 h-5"
                  checked={formData.tokenExpired}
                />
                <span className="ml-5 text-lg">Token Expired</span>
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.accountNotExpired}
                  name="accountNotExpired"
                  className="form-checkbox text-primary w-5 h-5"
                />
                <span className="ml-5 text-lg">Account Not Expired</span>
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.accountNotLocked}
                  name="accountNotLocked"
                  className="form-checkbox text-primary w-5 h-5"
                />
                <span className="ml-5 text-lg">Account Not Locked</span>
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.credentialNotExpired}
                  name="credentialNotExpired"
                  className="form-checkbox text-primary w-5 h-5"
                />
                <span className="ml-5 text-lg">Credential Not Expired</span>
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.monthlyNewsletterSubscription}
                  name="monthlyNewsletterSubscription"
                  className="form-checkbox text-primary w-5 h-5"
                />
                <span className="ml-5 text-lg">Monthly Newsletter Subscription</span>
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.allowPrivateMessages}
                  name="allowPrivateMessages"
                  className="form-checkbox text-primary w-5 h-5"
                />
                <span className="ml-5 text-lg">Allow Private Messages</span>
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.allowNotificationWhenSomeoneComments}
                  name="allowNotificationWhenSomeoneComments"
                  className="form-checkbox text-primary w-5 h-5"
                />
                <span className="ml-5 text-lg">Allow Notification When Someone Comments</span>
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.allowNotificationWhenSomeoneLikes}
                  name="allowNotificationWhenSomeoneLikes"
                  className="form-checkbox text-primary w-5 h-5"
                />
                <span className="ml-5 text-lg">Allow Notification When Someone Likes</span>
              </label>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

const PasswordSetting = ({
  userId,
  formData,
  setFormData,
  submitForm,
  prevStep,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async (id) => {
    if (!formData.password.trim()) {
      setError("Please Enter Password");
      return;
    }
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await fetch(`http://localhost:8080/v1/api/appUser/updatePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      setConfirmPassword("");
      setSuccess(true);
      setError("");
    } catch (error) {
      setError("Failed to update password");
      console.error("Failed to update password:", error);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {/* {userId && (
          <Grid item xs={12}>
            <ProfileHeader userData={formData} />
          </Grid>
        )} */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={userId == 0 ? "Enter Password" : "Update Password"}
            // title="Enter Password"
            />
            <CardContent>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">Password updated successfully!</Alert>}
              <form>
                {userId && (
                  <TextField
                    label="Old Password"
                    type="password"
                    name="oldPassword"
                    defaultValue={formData.password}
                    disabled
                    fullWidth
                    margin="normal"
                    className="bg-[#F9FAFC]"
                    size="small"
                  />
                )}
                <TextField
                  label="New Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                  className="bg-[#F9FAFC]"
                  size="small"
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                  className="bg-[#F9FAFC]"
                  size="small"

                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdatePassword(userId)}
                  sx={{ mt: 2 }}
                >
                  {userId ? "Update Password" : "Set Password"}
                </Button>
              </form>
              {userId && (
                <Card variant="outlined" sx={{ mt: 3 }}>
                  <CardContent>
                    <Typography variant="h6" color="error">
                      Delete Account
                    </Typography>
                    <Typography>
                      Once you delete your account, there is no going back. Please be certain.
                    </Typography>
                    <Button variant="outlined" color="error">
                      Yes, Delete
                    </Button>
                  </CardContent>
                  <CardActions>
                    <Typography variant="caption">
                      If you have trouble with the configuration, you can contact us. <a href="#">We Can Help</a>
                    </Typography>
                  </CardActions>
                </Card>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>


  );
};

const Seasons = ({ userId, username, formData }) => {
  const URL = `http://localhost:8080/api/auth/signin/${username}`;
  const [seasonData, setSeasonData] = useState([]);

  const colorStatus = ["text-red-600", "text-green-600", "text-yellow-600", "text-gray-600"];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(URL);
        console.log("Response", response);
        const userData = response.data;
        setSeasonData(userData);
      } catch (err) {
        console.log("Error in Fetch API", err);
      }
    };
    fetchUserData();
  }, [URL]);

  const handleRemoveSeason = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/signout/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSeasonData(seasonData.filter((item) => item.id !== id));
      } else {
        console.error('Failed to remove season:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing season:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-6">
        <div className="w-full lg:w-2/3">
          {/* ProfileHeader Component */}
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-xl font-semibold">Profile</h2>
            <p>{formData.username}</p>
          </div>

          {/* Login Season History Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h6 className="text-lg font-semibold mb-4">Login Season History</h6>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">#</th>
                  <th className="py-2">Browser & OS</th>
                  <th className="py-2">IP</th>
                  <th className="py-2">Location</th>
                  <th className="py-2">Signed In</th>
                  <th className="py-2">Expired On</th>
                  <th className="py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {seasonData.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 align-middle">
                      <i className={`fa fa-circle ${colorStatus[i % 4]}`}></i>
                    </td>
                    <td className="py-2">{item.userAgent}</td>
                    <td className="py-2">{item.remoteAddress}</td>
                    <td className="py-2">{item.location}</td>
                    <td className="py-2">{item.signedInOn}</td>
                    <td className="py-2">{item.expiryDate}</td>
                    <td className="py-2 align-middle text-right">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveSeason(item.id);
                        }}
                      >
                        <XCircleIcon className="w-5 h-5 text-red-600 hover:text-red-800" />
                      </a>
                      x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};



const UserWizard = ({ params }) => {
  const createMode = params.userId == 0              //true 
  const [currentStep, setCurrentStep] = useState(0);
  const [authorithies, setAuthorities] = useState(null);

  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    images: [],
    address: {
      addressOne: "",
      addressTwo: "",
      city: "",
      state: "",
      zipCode: "",
      county: "",
      country: "",
    },
    phone: {
      phoneNumber: "",
      phoneType: "",
    },
    gender: "",
    maritalStatus: "",
    birthdate: "",
    authorities: [],
    role: "",
    status: "",
    tokenExpired: false,
    accountNotExpired: false,
    accountNotLocked: false,
    credentialNotExpired: false,
    monthlyNewsletterSubscription: false,
    allowPrivateMessages: false,
    allowNotificationWhenSomeoneComments: false,
    allowNotificationWhenSomeoneLikes: false,
  });

  const Step = ({ label, isActive, isCompleted, icon, onClick }) => (
    <div className={`flex items-center cursor-pointer ${isActive ? 'text-blue-500' : 'text-gray-500'}`}
      onClick={onClick}>
      {isCompleted ? <FcOk className="h-7 w-10 mr-2" /> : icon}
      <span className="hidden sm:inline">{label}</span>
    </div>
  );

  const steps = [
    { label: 'Basic Details', icon: <UserIcon className="h-7 w-10 mr-2" /> },
    { label: 'Account Details', icon: <CogIcon className="h-7 w-10 mr-2" /> },
    { label: 'Password Setting', icon: <KeyIcon className="h-7 w-10 mr-2" /> },
    // params.userId && !createMode ? { label: 'Season', icon: <KeyIcon className="h-7 w-10 mr-2" /> } : ""
  ];

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const isComplete = (step) => step < currentStep;
  const handleStepClick = (stepIndex) => setCurrentStep(stepIndex);

  const submitForm = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = "FirstName is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "FirstName is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }


    formData.authorities = null;
    try {
      const imageData = new FormData();
      imageData.append('image', formData.images[0]);
      const imageUploadResponse = await fetch('http://localhost:8080/v1/media', {
        method: 'POST',
        body: imageData,
      });
      const imageUploadResult = await imageUploadResponse.json();
      console.log("ResponseImageUpload", imageUploadResult)
      setFormData({ ...formData, images: [imageUploadResult.data] });
    } catch (err) {
      console.log("error in upload image")
    }


    if (params.userId && !createMode) {
      // console.log("Upto Edit Endpoint")
      try {
        const update = await fetch(
          `http://localhost:8080/v1/api/appUser/${params.userId}`,
          {
            method: "PUT",
            body: JSON.stringify(formData, setAuthorities(null)),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const UserUpdate = await update.json();
        setFormData(UserUpdate);
        router.push("/admin/users");
      } catch (err) {
        console.log("Error in Update User", err);
      }
    } else {
      // console.log("Upto Create Endpoint")
      try {
        const response = await fetch("http://localhost:8080/v1/api/appUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log("created Data", data)
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          images: [],
          phoneNumber: "",
          phoneType: "",
          address: {
            addressOne: "",
            addressTwo: "",
            city: "",
            state: "",
            zipCode: "",
            county: "",
            country: "",
          },
          gender: "",
          maritalStatus: "",
          birthdate: "",
          role: "",
          tokenExpired: false,
          accountNotExpired: false,
          accountNotLocked: false,
          credentialNotExpired: false,
          monthlyNewsletterSubscription: false,
          allowPrivateMessages: false,
          allowNotificationWhenSomeoneComments: false,
          allowNotificationWhenSomeoneLikes: false,
        });
        router.push("/admin/users");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit data");
      }
    }
  };
  
  useEffect(() => {
    if (params.userId && !createMode) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/v1/api/appUser/${params.userId}`
          );
          const user = response.data;
          setFormData(user);
        } catch (err) {
          console.log("Error in Fetch Api at Edit User", err);
        }
      };
      fetchUserData();
    }
  }, [params.userId]);

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

          {currentStep === 0 && <BasicDetails userId={params.userId && !createMode} formData={formData} setFormData={setFormData} nextStep={nextStep} />}
          {currentStep === 1 && <AccountDetails userId={params.userId} formData={formData} setFormData={setFormData} nextStep={nextStep} />}
          {currentStep === 2 && <PasswordSetting formData={formData} setFormData={setFormData} submitForm={submitForm} userId={params.userId && !createMode} />}
          {/* {currentStep === 3 && <Seasons userId={params.userId && !createMode} formData={formData} setFormData={setFormData} />} */}


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
                onClick={submitForm}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                {createMode ? 'Create User' : 'Update User'}
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

export default UserWizard;
