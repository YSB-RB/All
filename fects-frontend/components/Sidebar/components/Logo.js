"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';

const Logo = () => {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLogo = localStorage.getItem('LogoPath');
      if (storedLogo) {
        setLogo(JSON.parse(storedLogo));
      }
    }
  }, []);

  return (
    <div className='cursor-pointer'>
      <Link href="/">
        {logo ? <img src={logo} alt="Logo" /> : 'Loading logo...'}
      </Link>
    </div>
  );
};

export default Logo;


