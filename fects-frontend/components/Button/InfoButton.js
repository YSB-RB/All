import React from 'react'

const InfoButton = ({ text, className, ...props }) => {
    return (
        <button className={`w-[50px] h-[50px] bg-black/85 rounded-full flex items-center justify-center z-[99] transition-colors duration-250 hover:bg-black/60 text-xl ${className}`}    {...props}>
            {text}
        </button>
    )
}

export default InfoButton