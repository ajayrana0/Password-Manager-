import React from 'react'

const Footer = () => {
    return (
        <div className='text-white bg-slate-800 flex flex-col text-center items-center justify-center shadow-inner fixed bottom-0 w-full'>
            <div className="logo font-bold text-1xl mb-1 ">
                <span className='text-green-500' >&lt;</span>
                Pass
                <span className='text-green-500' >/OP&gt;</span>
            </div>
            <div className="text-sm text-gray-300">
                Created by Ajay Rana © {new Date().getFullYear()}
            </div>
        </div>

    )
}

export default Footer
