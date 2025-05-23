import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-900 px-25 py-3 text-white'>
      <div className="container flex justify-between item-center">
        <div className="logo font-bold text-2xl">
          <span className='text-green-700' >&lt;</span>
          Pass
          <span className='text-green-700' >OP/&gt;</span>
        </div>
        {/* <ul>
          <li className='flex gap-5 text-xl'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul> */}
        <button  className='text-white bg-gray-700 rounded-xl w-25 flex justify-center items-center '>
          <img className='invert w-10' src="/icons8-github-30.png" alt="Github" />
          <span>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
