import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function NavbarDropdown({icons, label, menuItems }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="relative" ref={dropdownRef}>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        className={`flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-indigo-100 dark:hover:bg-indigo-600 ${open ? 'bg-indigo-100 dark:bg-indigo-600' : ''
          }`}
      >
        <span>{icons}</span>
        <span className="ml-2 text-sm"> {label} </span>
        <span className="ml-auto" aria-hidden="true">
          <svg
            className={`w-4 h-4 transition-transform transform ${open ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </Link>

      
      {open && (
        <div
          className="mt-2 space-y-2 px-7"
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block  p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:text-gray-400 dark:hover:text-light hover:text-gray-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}