import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white p-5 text-center relative z-50'>
        <div className='container mx-auto flex justify-between items-center'>
            <div className='flex space-x-4'>
                <a href='#' className='hover:underline'>Home</a>
                <a href='#' className='hover:underline'>About</a>
                <a href='#' className='hover:underline'>Services</a>
                <a href='#' className='hover:underline'>Contact</a>
                <a href='#' className='hover:underline'>Privacy Policy</a>
            </div>
            <div>
                <h1>Made with ❤️ by <a href='#' className='hover:underline'>Ayo</a></h1>
            </div>
        </div>
    </footer>
  )
}

export default Footer