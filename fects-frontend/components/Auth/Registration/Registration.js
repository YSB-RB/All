"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const RegisterAuth = ({ isLogin, OnRegister }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    //check username availability
    const [username, setUsername] = useState("");
    const [availability, setAvailability] = useState(null);

    const checkAvailability = async () => {
        if (isLogin) {
            return;
        }
        else {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/auth/usernameExists/${username}`
                );
                const data = await response.json();
                setAvailability(
                    data ? "Username already exists" : "Username is available"
                );
            } catch (error) {
                console.error("Error checking username availability:", error);
            }
        }

    };


    let typingtimer;
    const HandleUsernameChange = (e) => {
        const { value } = e.target;
        setUsername(value);

        typingtimer = setTimeout(() => {
            checkAvailability(value);
        }, 2000);
        setAvailability(null)
        setFormData({ ...formData, username: value });
    };


    const HandleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const HandleCreateAccount = (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.username.trim()) {
            errors.username = "Username is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (!formData.password.trim()) {
            errors.password = "Password is required";
        } else if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(errors).length === 0) {
            axios
                .post("http://127.0.0.1:8080/api/auth/signup", formData)
                .then((response) => {
                    console.log(response, "Response SignUp")
                    setSuccessMessage("Sign up successful!");
                    setErrors({});
                    setFormData({
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    });
                    window.location = "/login";
                })
                .catch((error) => {
                    console.log("Sign up error:", error.response.data.message);
                    console.log(error);
                    setErrors({ server: error.response.data.message });
                });
        } else {
            setErrors(errors);
        }
    };


    const HandleLogin = (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.username.trim()) {
            errors.username = "Username is required";
        }
        if (!formData.password.trim()) {
            errors.password = "Password is required";
        }

        if (Object.keys(errors).length === 0) {
            axios.post("http://localhost:8080/api/auth/signin", formData).then((response) => {
                console.log(response, "Response Login");
                setSuccessMessage("Login successful!");
                setErrors({});
                setFormData({
                    username: "",
                    password: "",
                });
                OnRegister(response.data)
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("tokenExpiryDate", response.data.expiryDate);
                window.location = "/";
            })
                .catch((error) => {
                    setErrors({
                        server: "Invalid username or password. Please try again.",
                    });
                });
        } else {
            setErrors(errors);
        }
    };

    return (
        <div className="h-screen  flex justify-center items-center dark:bg-gray-900">
            <div className="grid gap-8">
                <div id="back-div" className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
                    <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">

                        {/* Heading */}
                        <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
                            {isLogin ? "Login" : "Sign Up"}
                        </h1>

                        {/* Form Control with login value true/false */}
                        <form action="#" method="post" className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={formData.username}
                                    onChange={HandleUsernameChange}
                                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                                    placeholder="Username"
                                    required
                                />
                                {availability && <p className="mt-2 text-sm text-blue-600">{availability}</p>}
                                {errors.username && (
                                    <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                                )}
                            </div>
                            {
                                !isLogin && (
                                    <div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={HandleChange}
                                            className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                                            placeholder="Email"
                                            required
                                        />
                                        {/* <p color="muted" className="d-block ml-20">
                                            We&amp;ll never share your email with anyone else.
                                        </p> */}
                                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                )
                            }
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={HandleChange}
                                    className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                                    type="password"
                                    placeholder="Password"
                                    title='Password must be at least 8 characters'
                                    // pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}"
                                    // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    required
                                />
                                {errors.password && (
                                    <p className='mt-2 text-sm text-red-600'>{errors.password}</p>
                                )}

                            </div>

                            {
                                !isLogin && (
                                    <div>
                                        <input
                                            id="confirmpassword"
                                            name='confirmPassword'
                                            value={formData.confirmPassword}
                                            onChange={HandleChange}
                                            className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                        />
                                        {errors.confirmPassword && (
                                            <p className='mt-2 text-sm text-red-600'>{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                )
                            }

                            {errors.server && <p className="mt-2 text-sm text-red-600">{errors.server}</p>}
                            {successMessage && <p color="success">{successMessage}</p>}

                            <Link
                                className="group text-blue-400 transition-all duration-100 ease-in-out"
                                href="/forget-password"
                            >
                                <span
                                    className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                >
                                    Forget your password?
                                </span>
                            </Link>
                            {
                                isLogin ? (
                                    <button
                                        className="text-lg bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                                        type="submit"
                                        onClick={HandleLogin}
                                    >
                                        Login
                                    </button>
                                ) : (
                                    <button
                                        className="text-lg bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                                        type="submit"
                                        onClick={HandleCreateAccount}
                                    >
                                        Sign Up
                                    </button>
                                )
                            }
                        </form>


                        {/* Redirect to login or sign up page */}
                        <div className="flex flex-col mt-4 items-center justify-center text-sm">
                            {
                                isLogin ? (
                                    <h3 className="dark:text-gray-300">
                                        Don't have an account?
                                        <Link
                                            className="group text-blue-400 transition-all duration-100 ease-in-out"
                                            href="/signup"
                                        >
                                            <span
                                                className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                            >
                                                Sign Up
                                            </span>
                                        </Link>
                                    </h3>
                                ) : (
                                    <h3 className="dark:text-gray-300">
                                        Already have an account?
                                        <Link
                                            className="group text-blue-400 transition-all duration-100 ease-in-out"
                                            href="/login"
                                        >
                                            <span
                                                className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                            >
                                                Log in
                                            </span>
                                        </Link>
                                    </h3>
                                )
                            }
                        </div>

                        {/* Third party auth login */}
                        <div
                            id="third-party-auth"
                            className="flex items-center justify-center mt-5 flex-wrap"
                        >
                            <button
                                href="#"
                                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                            >
                                <img
                                    className="max-w-[25px]"
                                    src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                                    alt="Google"
                                />
                            </button>
                            <button
                                href="#"
                                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                            >
                                <img
                                    className="max-w-[25px]"
                                    src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                                    alt="Linkedin"
                                />
                            </button>
                            <button
                                href="#"
                                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                            >
                                <img
                                    className="max-w-[25px] filter dark:invert"
                                    src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                                    alt="Github"
                                />
                            </button>
                            <button
                                href="#"
                                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                            >
                                <img
                                    className="max-w-[25px]"
                                    src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                                    alt="Facebook"
                                />
                            </button>
                            <button
                                href="#"
                                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                            >
                                <img
                                    className="max-w-[25px] dark:gray-100"
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/b7/X_logo.jpg"
                                    alt="twitter"
                                />
                            </button>

                            <button
                                href="#"
                                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                            >
                                <img
                                    className="max-w-[25px]"
                                    src="https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/"
                                    alt="apple"
                                />
                            </button>
                        </div>

                        {/* Terms and conditions */}
                        <div
                            className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm"
                        >
                            <p className="cursor-default">
                                By signing in, you agree to our
                                <Link
                                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                                    href="/terms-conditions"
                                >
                                    <span
                                        className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                    >
                                        Terms
                                    </span>
                                </Link>
                                and
                                <Link
                                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                                    href="/privacy-policy"
                                >
                                    <span
                                        className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                    >
                                        Privacy Policy
                                    </span>
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterAuth;














