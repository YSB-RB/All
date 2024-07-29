import { useState, useRef, useEffect } from 'react';

const UserAvater = ({ avatarSrc, menuItems }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const ToggleUser = (prev) => {
        setOpen(!prev)
    }

    return (
        <>
            <div className="relative flex items-center justify-center flex-shrink-0">
                <div>
                    <button
                        onClick={() => setOpen(!open)}
                        type="button"
                        className="block transition-opacity duration-200 rounded-full dark:opacity-75 dark:hover:opacity-100 focus:outline-none focus:ring dark:focus:opacity-100"
                    >
                        <img
                            className="rounded-full"
                            src={avatarSrc}
                            alt="User Avatar"
                            width={65} height={65}
                        />
                    </button>

                    {open && (
                        <div
                            ref={menuRef}
                            className="absolute w-30 py-1 mb-4 bg-white rounded-md shadow-lg min-w-max right-5  ring-1 ring-black ring-opacity-5 dark:bg-dark focus:outline-none"
                        >
                            {menuItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-indigo-600"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>

    );
};

export default UserAvater;