import React from 'react'
import Link from 'next/link';
const SocialLinks = ({ link, icon, className }) => {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer" className={`${"flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-400"} ${className}`}>
      <div className='text-sm text-gray-600'>
        {icon}
      </div>
    </Link>
  )
}

export default SocialLinks;