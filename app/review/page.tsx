"use client"
import React, { useState, useContext, useRef } from 'react';
import Navbar from '../../components/Navbar';
import { DataContext } from '../../context/DataContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '@/components/Loading';
import ReactGA from "react-ga4";
import GridBackground from '@/components/ui/GridBackground';
import GradientOverlay from '@/components/ui/GradientOverlay';
import { FaDownload } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface PersonalDetailType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  github: string;
  linkedin: string;
}

interface ExperienceType {
  company: string;
  role: string;
  location: string;
  date: string;
  points: string[];
}

interface EducationType {
  college: string;
  course: string;
  location: string;
  date: string;
}

interface Projects {
  name: string;
  techstack: string;
  link: string;
  description: string[];
}

interface Achievements {
  name: string;
  description: string[];
}

interface Skills {
  name: string, 
  skills: string
}

interface DataType {
  personalDetail: PersonalDetailType | null;
  experience: ExperienceType[] | null;
  education: EducationType[] | null;
  projects: Projects[] | null;
  achievements: Achievements[] | null;
  skills: Skills[] | null;
}

export default function Review() {
  const context = useContext(DataContext);
  const data: DataType = context?.data || {
    personalDetail: null,
    experience: null,
    education: null,
    projects: null,
    achievements: null,
    skills: null
  };

  return (
    <>
      <GridBackground /> 
      <GradientOverlay />

      <div className='h-screen'>
        <ToastContainer />
        <Navbar />
        <p className='text-white text-md md:text-2xl text-center'>Review your Details</p>
        <div className='flex justify-center md:justify-between mx-[20%]'>
          <DownloadModal data={data} />
        </div>
        <div className='xl:mx-[20%] md:mx-[10%] mx-[4%] h-[90%]'>
          <Section title="Personal Details" data={data?.personalDetail} Component={PersonalDetailSection} />
          <Section title="Education" data={data?.education} Component={EducationSection} />
          <Section title="Experience" data={data?.experience} Component={ExperienceSection} />
          <Section title="Projects" data={data?.projects} Component={ProjectSection} />
          <Section title="Achievement" data={data?.achievements} Component={AchievementSection} />
          <Section title="Skills" data={data?.skills} Component={SkillsSection} />
          <div className='h-20'></div>
        </div>
      </div>
    </>
  );
};

interface SectionProps {
  title: string;
  data: PersonalDetailType | EducationType[] | ExperienceType[] | Projects[] | Achievements[] | Skills[] | null;
  Component: React.ComponentType<{ data: PersonalDetailType | EducationType[] | ExperienceType[] | Projects[] | Achievements[] | Skills[] | null }>;
}

const Section: React.FC<SectionProps> = ({ title, data, Component }) => (
  <div className='text-white'>
    <h2 className='text-center text-sm lg:text-2xl font-semibold'>{title}</h2>
    {data == null ? <h2 className='text-center text-sm lg:text-2xl text-gray-400'>No data available</h2> : <Component data={data} />}
    <hr className="border border-gray-300 my-4" />
  </div>
);

const DownloadModal = ({ data} : {data: DataType} ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfId, setPdfId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const initiateProcess = async () => {
    try {
      ReactGA.event({ category: "download", action: "download initiated" });
      const response = await axios.post(`${BASE_URL}/api/createpdf`, { data });
      if (response?.data?.status === 'failure') {
        toast(response?.data?.msg);
        return;
      }
      setPdfId(response?.data?.id);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      ReactGA.event({ category: "download", action: "pdf downloaded" });
      setIsLoading(true);
      await axios.post(`${BASE_URL}/api/setemail`, { pdfId, data });
      if (linkRef.current) {
        linkRef.current.click();
      }
      setIsOpen(false);
      setPdfId('');
      setIsLoading(false);
    };

  return (
    <>
      <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300" onClick={initiateProcess}>
        <FaDownload className="mr-2" /> Download
      </button>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-sm w-full">
              <div className="bg-white px-4 py-5">
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Download your resume</h3>
                  <div className="mt-2">
                    <form>
                      <div className="mt-2">
                        {isOpen && <a href={`${BASE_URL}/api/getpdf?id=${pdfId}`} ref={linkRef} style={{ display: 'none' }}>Hidden Link</a>}
                        {isLoading ? (
                          <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <Loading />
                          </button>
                        ) : (
                          <button onClick={handleSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <FaDownload className="mr-2" /> Download
                          </button>
                        )}
                        <button type="button" className="ml-2 inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={closeModal}>
                          <AiOutlineClose className="mr-2" /> Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SkillsSection = ({ data }: { data: Skills[] }) => (
  <div className='text-white'>
    {data?.map((val, index) => (
      <div key={index} className='bg-gray-800 my-2'>
        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>{val?.name}: {val?.skills}</span>
        </p>
      </div>
    ))}
  </div>
);

const AchievementSection = ({ data }: { data: Achievements[] }) => (
  <div className='text-white'>
    {data?.map((val, index) => (
      <div key={index} className='bg-gray-800 my-2'>
        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>Company: {val?.name}</span>
        </p>
        <div className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>Points</span>
          <div>
            {val.description?.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ExperienceSection = ({ data }: { data: ExperienceType[] }) => (
  <div className='text-white'>
    {data?.map((val, index) => (
      <div key={index} className='bg-gray-800 my-2'>
        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>Company: {val?.company}</span>
          <span>Role: {val?.role}</span>
        </p>
        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>Location: {val?.location}</span>
          <span>Date: {val?.date}</span>
        </p>
        <div className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>Points</span>
          <div>
            {val.points?.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ProjectSection = ({ data }: { data: Projects[] }) => (
  <div className='text-white'>
    {data?.map((val, index) => (
      <div key={index} className='bg-gray-800 my-2'>
        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>Project Name: {val?.name}</span>
          <span>Tech Stack: {val?.techstack}</span>
        </p>
        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>Link: {val?.link}</span>
        </p>
        <div className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>Points</span>
          <div>
            {val.description?.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EducationSection = ({ data }: { data: EducationType[] }) => (
  <div className='text-white'>
    {data?.map((val, index) => (
      <div key={index} className='bg-gray-800 my-2'>
        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>College Name: {val?.college}</span>
          <span>Course: {val?.course}</span>
        </p>
        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
          <span>Location: {val?.location}</span>
          <span>Year: {val?.date}</span>
        </p>
      </div>
    ))}
  </div>
);

const PersonalDetailSection = ({ data }: { data: PersonalDetailType | null }) => (
  <div className="bg-gray-800 my-2">
    <div className='text-white'>
      <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
        <span>First Name: {data?.firstName}</span>
        <span>Last Name: {data?.lastName}</span>
      </p>
      <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
        <span>Email: {data?.email}</span>
        <span>Phone Number: {data?.phoneNo}</span>
      </p>
      <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
        <span>Github: {data?.github}</span>
        <span>Linkedin: {data?.linkedin}</span>
      </p>
    </div>
  </div>
);

const isValidEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
