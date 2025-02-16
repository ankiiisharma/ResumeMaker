"use client"
import React, { useState, useContext, useRef } from 'react';
import Navbar from '../../components/Navbar';
import { DataContext, DataType } from "@/context/DataContext";
import type { Skills } from "@/context/DataContext";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '@/components/Loading';
import ReactGA from "react-ga4";
import GridBackground from '@/components/ui/GridBackground';
import GradientOverlay from '@/components/ui/GradientOverlay';
import { FaDownload } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { GrAchievement } from 'react-icons/gr';
// import { MdEmail } from 'react-icons/md';

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
  cllgName: string;
  course: string;
  location: string;
  year: string;
}

interface Projects {
  projectName: string;
  tech: string;
  link: string;
  points: string[];
}

// interface Achievements {
//   name: string;
//   points: string[];
// }

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
          <Section<PersonalDetailType> title="Personal Details" data={data?.personalDetail} Component={PersonalDetailSection} />
          <Section<EducationType[]> title="Education" data={data?.education} Component={EducationSection} />
          <Section<ExperienceType[]> title="Experience" data={data?.experience} Component={ExperienceSection} />
          <Section<Projects[]> title="Projects" data={data?.projects} Component={ProjectSection} />
          <Section<Skills[]> title="Skills" data={data?.skills} Component={SkillsSection} />
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
              <GrAchievement className="w-6 h-6 mr-2" /> Achievements
            </h2>
            
            {data.achievements && data.achievements.length > 0 ? (
              data.achievements.map((achievement, index) => (
                <div key={index} className="mb-6 bg-gray-800/40 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {achievement.name}
                  </h3>
                  <ul className="list-disc list-inside">
                    {achievement.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="text-gray-300 ml-4">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No achievements added</p>
            )}
          </div>
          <div className='h-20'></div>
        </div>
      </div>
    </>
  );
};

interface SectionProps<T> {
  title: string;
  data: T | null;
  Component: React.ComponentType<{ data: T }>;
}

const Section = <T,>({ title, data, Component }: SectionProps<T>) => (
  <div className='text-white'>
    <h2 className='text-center text-sm lg:text-2xl font-semibold'>{title}</h2>
    {data == null ? (
      <h2 className='text-center text-sm lg:text-2xl text-gray-400'>No data available</h2>
    ) : (
      <Component data={data} />
    )}
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
  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
    {data?.map((val, index) => (
      <div key={index} className='bg-gray-800/40 p-4 rounded-lg'>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-semibold'>{val?.skillName}</span>
          <span className='text-blue-400'>{val?.skillValue}</span>
        </div>
      </div>
    ))}
  </div>
);

const ExperienceSection = ({ data }: { data: ExperienceType[] }) => (
  <div className='space-y-6'>
    {data?.map((val, index) => (
      <div key={index} className='bg-gray-800/40 p-6 rounded-lg'>
        <div className='flex flex-col md:flex-row md:justify-between mb-4'>
          <div>
            <h3 className='text-xl font-bold text-blue-400'>{val?.company}</h3>
            <p className='text-lg font-semibold'>{val?.role}</p>
          </div>
          <div className='text-gray-400'>
            <p>{val?.location}</p>
            <p>{val?.date}</p>
          </div>
        </div>
        <ul className='list-disc list-inside space-y-2'>
          {val.points?.map((point, index) => (
            <li key={index} className='text-gray-300 ml-4'>{point}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const ProjectSection = ({ data }: { data: Projects[] }) => (
  <div className='space-y-6'>
    {data?.map((project, index) => (
      <div key={index} className='bg-gray-800/40 p-6 rounded-lg'>
        <div className='flex flex-col md:flex-row justify-between mb-4'>
          <h3 className='text-xl font-bold text-blue-400'>{project.projectName}</h3>
          <div className='text-gray-400'>
            <span className='bg-gray-700 px-3 py-1 rounded-full text-sm'>
              {project.tech}
            </span>
          </div>
        </div>
        {project.link && (
          <a href={project.link} 
             target="_blank" 
             rel="noopener noreferrer" 
             className='text-blue-400 hover:text-blue-300 mb-4 inline-block'>
            Project Link ↗
          </a>
        )}
        <ul className='list-disc list-inside space-y-2'>
          {project.points.map((point, idx) => (
            <li key={idx} className='text-gray-300 ml-4'>{point}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const EducationSection = ({ data }: { data: EducationType[] }) => (
  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
    {data?.map((edu, index) => (
      <div key={index} className='bg-gray-800/40 p-6 rounded-lg'>
        <h3 className='text-xl font-bold text-blue-400 mb-2'>{edu.cllgName}</h3>
        <p className='text-lg font-semibold mb-2'>{edu.course}</p>
        <div className='text-gray-400'>
          <p>{edu.location}</p>
          <p>{edu.year}</p>
        </div>
      </div>
    ))}
  </div>
);

const PersonalDetailSection = ({ data }: { data: PersonalDetailType | null }) => (
  <div className='bg-gray-800/40 p-6 rounded-lg'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-4'>
        <div>
          <label className='text-gray-400 text-sm'>Full Name</label>
          <p className='text-lg font-semibold'>{data?.firstName} {data?.lastName}</p>
        </div>
        <div>
          <label className='text-gray-400 text-sm'>Email</label>
          <p className='text-lg'>{data?.email}</p>
        </div>
        <div>
          <label className='text-gray-400 text-sm'>Phone</label>
          <p className='text-lg'>{data?.phoneNo}</p>
        </div>
      </div>
      <div className='space-y-4'>
        <div>
          <label className='text-gray-400 text-sm'>Github</label>
          <a href={data?.github} 
             target="_blank" 
             rel="noopener noreferrer" 
             className='text-blue-400 hover:text-blue-300 block'>
            {data?.github}
          </a>
        </div>
        <div>
          <label className='text-gray-400 text-sm'>LinkedIn</label>
          <a href={data?.linkedin} 
             target="_blank" 
             rel="noopener noreferrer" 
             className='text-blue-400 hover:text-blue-300 block'>
            {data?.linkedin}
          </a>
        </div>
      </div>
    </div>
  </div>
);
 

