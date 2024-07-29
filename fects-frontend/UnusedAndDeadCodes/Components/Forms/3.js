

"use client"

import React, { useState, useEffect } from "react";
import { Tab } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import HeaderMain from "@/components/HeaderMain/HeaderMain";
import axios, { all } from "axios";
import { FcPlus, FcOk } from "react-icons/fc";
import { CheckIcon, UserIcon, KeyIcon, CogIcon } from '@heroicons/react/solid';
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

const steps = [
    { id: 'basicDetails', label: 'Basic Details', icon: <UserIcon className="h-5 w-5" /> },
    { id: 'accountDetails', label: 'Account Details', icon: <ClipboardListIcon className="h-5 w-5" /> },
    { id: 'passwordSetting', label: 'Password Setting', icon: <LockClosedIcon className="h-5 w-5" /> },
    { id: 'seasons', label: 'Season', icon: <CreditCardIcon className="h-5 w-5" /> }
];

export default function CreateUser({ userId }) {


    const [authorithies, setAuthorities] = useState(null);
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
    const router = useRouter()

    const submitForm = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!formData.firstName.trim()) {
            errors.firstName = "FirstName is required";
        }
        if (!formData.lastName.trim()) {
            errors.lastName = "lastName is required";
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
        // if (!formData.confirmPassword.trim()) {
        //   errors.confirmPassword = "Confirm Password is required";
        // } else if (formData.confirmPassword !== formData.password) {
        //   errors.confirmPassword = "Passwords do not match";
        // }
        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match";
        }


        formData.authorities = null;
        if (userId) {
            try {
                const update = await fetch(
                    `http://localhost:8080/v1/api/appUser/${userId}`,
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
                alert("User Updated")
                router.push("/users");
            } catch (err) {
                console.log("Error in Update User", err);
            }
        } else {
            try {
                const response = await fetch("http://localhost:8080/v1/api/appUser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
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
                alert("User Created")
                router.push("/admin/users");

            } catch (error) {
                console.error("Error:", error);
                alert("Failed to submit data");
            }
        }
        // };

        // const submitForm = async (e) => {
        //   e.preventDefault();
        //   try {
        //     let response;
        //     if (userId) {
        //       response = await fetch(
        //         `http://localhost:8080/v1/api/appUser/${userId}`,
        //         {
        //           method: "PUT",
        //           headers: {
        //             "Content-Type": "application/json",
        //           },
        //           body: JSON.stringify(
        //             formData,
        //             setAuthorities(null),
        //             // setImage(null),
        //             // setRole(null)
        //           ),
        //         }
        //       );
        //       console.log("Edited User Data : ", response);
        //     } else {
        //       response = await fetch("http://localhost:8080/v1/api/appUser", {
        //         method: "POST",
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(formData),
        //       });
        //       console.log("Submitted User Data : ", response);
        //     }
        //     //   if (response.ok) {
        //     //     history.push('/users');
        //     //   } else {
        //     //     alert('Failed to update user data.');
        //     //   }
        //   } catch (error) {
        //     console.error("Error:", error);
        //     alert("Failed to do Action in  user data.");
        //   }
        // };

        // If userId exists, fetch user data and populate the form

        useEffect(() => {
            if (userId) {
                const fetchUserData = async () => {
                    try {
                        const response = await axios.get(
                            `http://localhost:8080/v1/api/appUser/${userId}`
                        );
                        const user = response.data;
                        setFormData(user);
                    } catch (err) {
                        console.log("Error in Fetch Api at Edit User", err);
                    }
                };
                fetchUserData();
            }
        }, [userId]);

        return (
            <div className="container w-[1024px] mt-40 mx-auto p-6">
                <Wizard steps={steps} userId={userId} formData={formData} setFormData={setFormData} submitForm={submitForm}>
                    <BasicDetails userId={userId} formData={formData} setFormData={setFormData} />
                    <AccountDetails userId={userId} formData={formData} setFormData={setFormData} />
                    <PasswordSetting formData={formData} setFormData={setFormData} submitForm={submitForm} userId={userId} />
                    {userId && <Seasons formData={formData} userId={userId} username={formData.username} />}
                </Wizard>
            </div>
        );
    }
}