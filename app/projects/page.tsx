"use client"
import GradientOverlay from '@/components/ui/GradientOverlay'
import GridBackground from '@/components/ui/GridBackground'
import { DataContext } from '@/context/DataContext'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import { useContext, useState, useEffect } from 'react'
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import { TbSettingsCog } from "react-icons/tb";

interface Projects {
    projectName: string;
    tech: string;
    link: string;
    points: string[];
}

const defaultProjects: Projects = {
    projectName: "",
    tech: "",
    link: "",
    points: ["", ""]
};

export default function Projects() {
   const router = useRouter();
    const context = useContext(DataContext)
    const [formData , setFormData] = useState<Projects[]>([]);

    useEffect(()=>{
        if(context?.data.projects && context.data.projects.length > 0){
            setFormData(context.data.projects);
        }else{
            setFormData([defaultProjects]);
        }
    }, [context?.data.projects])

    if(!context){
        return(
            <>
                <h1 className='text-red-500 font-bold'> something is wrong!! </h1>
            </>
        )
    }

    const { updateData } = context;

    const handlePointChange = (
      index: number,
      pointIndex: number,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const data = [...formData];
      const newPoints = [...data[index].points];
      newPoints[pointIndex] = event.target.value;
      data[index] = {
        ...data[index],
        points: newPoints
      };
      setFormData(data);
    };

    const addInput = () => {
      setFormData([...formData, defaultProjects]);
    };
  
    const addPoint = (index: number) => {
      const data = [...formData];
      data[index] = {
        ...data[index],
        points: [...data[index].points, ""]
      };
      setFormData(data);
    };
  
    const removeItem = (index: number) => {
      if (formData.length > 1) {
        const data = [...formData];
        data.splice(index, 1);
        setFormData(data);
      }
    };
  
    const removePoint = (index: number, pointIndex: number) => {
      if (formData[index].points.length > 1) {
        const data = [...formData];
        const newPoints = [...data[index].points];
        newPoints.splice(pointIndex, 1);
        data[index] = {
          ...data[index],
          points: newPoints
        };
        setFormData(data);
      }
    };
    
    const handleInputChange = (index: number, field: keyof Projects, value: string) => {
        const newFormData = [...formData];
        newFormData[index] = { 
            ...newFormData[index], 
            [field]: value 
        };
        setFormData(newFormData);
    }

    const nextPage = () => {
        updateData("projects", formData);
        router.push("/achievements");
    }

  return (
    <> 
     <GridBackground/>
     <GradientOverlay />
    
    <motion.div className='min-h-screen flex flex-col items-center justify-center text-white px-4'
    initial = {{opacity:0, y: -50}}
    animate = {{ opacity:1 , y: 1, transition: {type: "spring", stiffness: 50, delay: 0.2}}}
    > 

    <motion.div className='flex items-center'
      initial={{opacity:0, y:20 }}
      animate={{opacity:1, y: 0,
        transition: {type: "spring", stiffness: 50, delay: 0.4}
      }}
    > 
      <h1 className="text-4xl text-blue-400 font-semibold tracking-[-2px] mb-6 flex items-center">
        <TbSettingsCog className="w-8 mr-2" /> Projects
         </h1>
         <div className="w-[150px] h-1 bg-gradient-to-r from-blue-500 via-blue-300 to-transparent rounded-full mb-6 ml-2" />
    </motion.div>

      
    <motion.div className='w-full max-w-2xl bg-gray-900 border border-gray-300/30 p-8 rounded-xl shadow-lg mb-4'
      initial={{opacity:0, y:20 }}
      animate={{opacity:1, y: 0,
      transition: {type: "spring", stiffness: 50, delay: 0.4}
      }}
    >
     {formData.map((value, index) => (
        <div key={index} className='mb-6'> 
         <div className='flex justify-end'> 
            {formData.length > 1 && (
                 <button
                type="button"
                onClick={() => removeItem(index)}
                className="focus:outline-none text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center"
                 >
                <FaTrashAlt className="w-5" /> Delete Project
                </button>
            )}
         </div>

         <div className='grid gap-3 mb-6 md:grid-cols-2'>
            <div> 
            <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    placeholder="tic-tac-toe"
                    value={value.projectName}
                    onChange={(e) => handleInputChange(index, "projectName", e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
            </div> 

            <div> 
            <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                    Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    placeholder="https://localhost:3000"
                    value={value.link}
                    onChange={(e) => handleInputChange(index, "link", e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
            </div> 

            <div> 
            <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    name="tech"
                    placeholder="Typescript, React, Tailwindcss"
                    value={value.tech}
                    onChange={(e) => handleInputChange(index, "tech", e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
            </div>
         </div>
         
         {value.points.map((point, pointIndex) => (
                <div
                  key={pointIndex}
                  className="flex flex-row space-x-5 w-full mb-4"
                >
                  <div className="w-[90%]">
                    <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1 flex items-end">
                      Project Description <p className='text-sm font-normal ml-1'>( add in points) </p>
                    </label>
                    <input
                      type="text"
                      placeholder="Implemented user authentication using JWT tokens"
                      value={point}
                      onChange={(e) => handlePointChange(index, pointIndex, e)}
                      className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {value.points.length > 1 && (
                      <button
                      type="button"
                      onClick={() => removePoint(index, pointIndex)}
                      className="focus:outline-none text-white mt-7 bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 h-10"
                    >
                      <FaTrashAlt />
                    </button>                
                  )}
            </div>
            ))}
              <div className='flex justify-end'> 
                 <button 
                    onClick={() => addPoint(index)} 
                    className='focus:outline-none text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-1 flex items-center'
                 > 
                    <FaPlusCircle className="mr-2" /> Add Description
                 </button>
              </div>
        </div>
     ))}

    <div className='flex justify-start'> 
      <button onClick={addInput} className='text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-1 flex items-center'> 
      <FaPlusCircle className="mr-2" /> Add Project
      </button>
    </div>
    
    <div className="flex justify-between w-full mt-1">
      <button
        type="button"
        className="text-white bg-blue-700 font-semibold hover:bg-blue-800 w-[50%] rounded-md text-sm px-5 py-2.5 mr-2 mb-2"
      >
        <Link href="/experience">Previous</Link>
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

    </motion.div>
    </>
  )
}