"use client";

import { useContext, useEffect, useState,  } from 'react';
import GradientOverlay from '@/components/ui/GradientOverlay';
import GridBackground from '@/components/ui/GridBackground';
import { DataContext } from '@/context/DataContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaGraduationCap, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import Link from 'next/link';

type Education = {
    cllgName: string;
    course: string;
    location: string;
    year: string;
}

const defaultExperience : Education = {
    cllgName: "",
    course: "",
    location: "",
    year: "",
}

const defaultEducation = [{ cllgName: '', course: '', location: '', year: '' }];

export default function Education() {
    
  const router = useRouter();
  const context = useContext(DataContext);
  if (!context) throw new Error("DataContext must be used within DataProvider");
  const { data, updateData } = context;
  
  // Ensure we always have a default value
  const [formData, setFormData] = useState(
    data?.education?.length ? data.education : defaultEducation
  );

    useEffect(() => {
        if(data?.education && data.education.length > 0) {
            const transformedData = data.education.map(item => ({
                cllgName: item.cllgName,
                course: item.course,
                location: item.location,
                year: item.year
            }));
            setFormData(transformedData);
        }
    }, [data?.education]);

    if(!data){
        return <p className="text-red-500">Error: DataContext not found</p>;
      };

      const addInput = () => {
        setFormData([...formData, defaultExperience]);
      }

      const removeInput = (index: number) => {
          if(formData.length > 1){
            const data = [...formData];
            data.splice(index,1);
            setFormData(data);
          }
      }

      const handleInputChange = (index: number, field: keyof Education, value: string) =>{
        const newFormData = [...formData];
        newFormData[index] = {...newFormData[index], [field]: value};
        setFormData(newFormData);
      }



      const nextPage = () => {
        const contextData = formData.map(item => ({
            cllgName: item.cllgName,
            course: item.course,
            location: item.location,
            year: item.year
        }));
        updateData("education", contextData);
        router.push("/experience");
      }

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 50,
            delay: 0.4,
          },
        },
      };
    
      const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const contextData = formData.map(item => ({
            cllgName: item.cllgName,
            course: item.course,
            location: item.location,
            year: item.year
        }));
        updateData("education", contextData);
        router.push("/experience");
      }

  return (
   <>
   <GridBackground /> 
   <GradientOverlay />

    <section className='min-h-screen flex flex-col items-center justify-center text-white px-4'> 
      <motion.div className="flex items-center" variants={itemVariants}>
          <h1 className="text-4xl text-blue-400 font-semibold tracking-[-2px] mb-6 flex items-center mt-2">
            <FaGraduationCap className="w-6 mr-2" /> Education
          </h1>
          <div className="w-[150px] h-1 bg-gradient-to-r from-blue-500 via-blue-300 to-transparent rounded-full mb-6 ml-2" />
        </motion.div>

        <motion.div
           className='w-full max-w-2xl bg-gray-900 border border-gray-300/30 p-8 rounded-xl shadow-lg mb-4'
           initial={{opacity: 0, y:20}}
           animate={{
            opacity: 1,
            y:0,
            transition: {type: "spring", stiffness: 50, delay: 0.4},
           }}
        >
          {formData.map((value,index) => (
            <form key={index} onSubmit={onSubmit} className='mb-6'> 
              <div className='flex justify-end'> 
                {formData.length > 1 && (
                  <button
                  onClick={()=>removeInput(index)}
                  className="focus:outline-none text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center"
                  >
                    <FaTrashAlt className="w-5" /> Delete this School/College
                  </button>
                )}
              </div>

            <div className='grid gap-3 md:grid-col-2 mb-2'>   
              <div> 
                <label className='block text-base font-semibold tracking-tight text-gray-200 items-center mb-2' >
                  College
                </label>
                <input type='text' name='cllgName' placeholder='Dholakpur institute of technology'
                value={value.cllgName}
                onChange={(e)=> handleInputChange(index, 'cllgName', e.target.value)}
                className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
              </div>

              <div> 
                <label className='block text-base font-semibold tracking-tight text-gray-200 items-center mb-2' >
                  Course
                </label>
                <input type='text' name='course' placeholder='B. Tech CSE'
                value={value.course}
                onChange={(e)=> handleInputChange(index, 'course', e.target.value)}
                className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
              </div>

              <div> 
                <label className='block text-base font-semibold tracking-tight text-gray-200 items-center mb-2' >
                  Location
                </label>
                <input type='text' name='location' placeholder='New Delhi, India'
                value={value.location}
                onChange={(e)=>handleInputChange(index,'location', e.target.value)}
                className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
              </div>

              <div> 
                <label className='block text-base font-semibold tracking-tight text-gray-200 items-center mb-2' >
                  Completion Date
                </label>
                <input type='text' name='year' placeholder='2019 - 2023'
                value={value.year}
                onChange={(e)=> handleInputChange(index, 'year', e.target.value)}
                className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
              </div>
          </div>
        </form>
          ))}
      
      <div className='flex justify-end'>
                  <button
                  type='button'
                  onClick={addInput}
                  className="text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-1 flex items-center"
                >
                  <FaPlusCircle className="mr-2" />
                  Add College/School
                  </button>
              </div>

      <div className='w-full justify-center flex mt-2'> 
      <button
              type="button"
              className="text-white bg-blue-700 font-semibold hover:bg-blue-800 w-[50%] rounded-md text-sm px-5 py-2.5 mr-2 mb-2"
            >
            <Link href="/personal">
              Previous
            </Link>
            </button>

            <button
              type="button"
              onClick={nextPage}
              className="text-white bg-blue-700 hover:bg-blue-800 w-[50%] font-semibold rounded-md text-sm px-5 py-2.5 mr-2 mb-2"
            >
            
            Next
          
            </button>
      </div>

      </motion.div> 
    </section>

   </>
  )
};