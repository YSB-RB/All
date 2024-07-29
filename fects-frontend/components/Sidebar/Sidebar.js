"use client"

import React, { useState, useEffect, useRef } from 'react'
import { FcManager, FcBarChart, FcEmptyFilter, FcImageFile, FcMenu } from "react-icons/fc";
import NavbarDropdown from './components/NavbarDropdown';
import UserAvater from './components/UserAvater';
import Logo from './components/Logo';

const Sidebar = () => {
    const [isDark, setIsDark] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [openUser, setOpenUser] = useState(false)
    const userMenuRef = useRef(null);
    const dropdownRef = useRef(null);
    const loadingRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);


    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setOpenUser(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userMenuRef]);


    useEffect(() => {
        loadingRef.current.classList.add('hidden');
        setIsDark(getTheme());
        watchScreen();
        window.addEventListener('resize', watchScreen);
        return () => window.removeEventListener('resize', watchScreen);
    }, []);


    const getTheme = () => {
        if (typeof window !== 'undefined') {
            const dark = window.localStorage.getItem('dark');
            return dark ? JSON.parse(dark) : !!window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    };


    const setTheme = (value) => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('dark', value);
        }
    };


    const toggleTheme = () => {
        setIsDark(!isDark);
        setTheme(!isDark);
    };


    const watchScreen = () => {
        setIsSidebarOpen(window.innerWidth >= 1024);
    };


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


    const HomeMenu = [
        { label: 'Album', href: '#' },
        { label: 'Gellary', href: '#' },
    ];

    const AuthenticationMenu = [
        { label: 'Register', href: '/signup' },
        { label: 'Login', href: '/login' },
        { label: 'Password Reset', href: '/reset-password' },
    ];

    const ContestMenu = [
        { label: "All Contest", href: "/contest-list" },
        { label: 'Best Contest', href: '#' },
    ]

    const AdminMenu = [
        { label: 'Configuration', href: '/admin/configuration' },
        { label: "Users", href: "/admin/users" },
        { label: "Contest", href: "/admin/contest" },
        { label: 'Survey', href: '/survey' },
        { label: 'Question Bank', href: '/question-bank' },
    ]

    const SurvayMenu = [
        { label: "All Survay", href: "" },
        { label: 'Create Survay', href: '#' },
        { label: 'Best Survay', href: '#' },
        { label: 'Perticipants', href: '#' },
    ]

    const userMenuItems = [
        { label: 'Your Profile', href: '#' },
        { label: 'Settings', href: '#' },
        { label: 'Logout', href: '#' },
    ]

    return (
        <>
            <div className={`${isDark ? 'dark' : ''}`} data-theme={isDark ? 'dark' : 'light'}>
                <div className="flex fixed h-screen text-gray-900 dark:bg-dark dark:text-light">
                    <div ref={loadingRef} className="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white">
                    </div>
                    {isSidebarOpen && (
                        <div className="fixed inset-0 z-10 lg:hidden" style={{ opacity: 0.5 }} onClick={() => setIsSidebarOpen(false)}>
                        </div>
                    )}
                    <aside className={`fixed inset-y-0 z-10 flex flex-shrink-0 overflow-hidden bg-white border-r dark:border-indigo-800 dark:bg-darker focus:outline-none lg:static transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <nav aria-label="Main" className="flex-1 w-64 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">

                            <header className="flex justify-between p-10 bg-white dark:bg-darker dark:border-indigo-800">
                                <Logo />
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="p-2  rounded-md focus:outline-none focus:ring"
                                >
                                    {isSidebarOpen ? <FcMenu size={30} /> : <FcManager size={30} />}
                                </button>
                            </header>
                            <div>
                                <NavbarDropdown icons={<FcBarChart />} label="Home" menuItems={HomeMenu} />
                                <NavbarDropdown icons={<FcImageFile />} label="Contest List" menuItems={ContestMenu} />
                                <NavbarDropdown icons={<FcEmptyFilter />} label="Survay" menuItems={SurvayMenu} />
                                <NavbarDropdown icons={<FcManager />} label="Authentication" menuItems={AuthenticationMenu} />
                                <NavbarDropdown icons={<FcManager />} label="Admin" menuItems={AdminMenu} />
                            </div>

                            <div>
                                <UserAvater
                                    avatarSrc="https://avatars.githubusercontent.com/u/97525491?v=4"
                                    menuItems={userMenuItems}
                                />
                            </div>
                            <p className='text-sm text-gray-500 text-center'>!! Hello And Welcome to fetcs !! </p>
                        </nav>
                    </aside>
                </div>

            </div>
        </>
    )
}

export default Sidebar