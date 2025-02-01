import Image from 'next/image';
import ResumeTemplate from "../public/resume.jpg"
import Navbar from './Navbar';

const Hero = () => {
  return (
    <> 
      <Navbar />
      <section className='hero mt-[150px] px-4 md:px-8 lg:px-16'>
        <div className='relative'>
          <div className='absolute left-[-100px] top-0 transform rotate-[6deg] transition-transform duration-300 ease-in-out group-hover:rotate-0 overflow-hidden z-0'>
            <Image 
              src={ResumeTemplate} 
              alt='resume template' 
              className='object-cover rounded-md border border-gray-400 transform hover:translate-y-[-8px] ease-linear duration-150' 
              width={800} 
              height={600} 
              style={{ objectPosition: 'top', objectFit: 'cover' }} 
            />
          </div>
          <div className='relative flex flex-col justify-center p-4 md:p-10 ml-[720px] z-10'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight'>
              Create an ATS friendly
            </h1>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mt-2'>
              Resume in 5 minutes!
            </h1>
            <h3 className='text-xl md:text-2xl lg:text-3xl tracking-tighter font-semibold mt-5'>
              Helping you create a professional resume in minutes.
            </h3>
            <div className='mt-5'>
              <button className='bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200'>
                Click here to get started
              </button>
            </div>
          </div>
        </div>

        <div className='relative w-full mt-10 p-4 md:p-10 bg-gray-100 rounded-md z-20'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight'>
            Why choose our resume builder?
          </h2>
          <ul className='list-disc list-inside mt-4 text-lg md:text-xl lg:text-2xl'>
            <li>Easy to use and customize</li>
            <li>Professional templates</li>
            <li>ATS friendly</li>
            <li>Save and download in multiple formats</li>
          </ul>
        </div>

      </section>
    </>
  )
}

export default Hero