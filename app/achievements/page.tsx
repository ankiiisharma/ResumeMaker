"use client";

import React, { useState, useEffect, useContext } from 'react';
import GradientOverlay from '@/components/ui/GradientOverlay'
import GridBackground from '@/components/ui/GridBackground'
import { DataContext } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GrAchievement } from "react-icons/gr";
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import Link from 'next/link';


type Achievements = {
    name: string;
    points: string[];
}

const defaultAchievement : Achievements = {
    name: "",
    points: [""],
}

export default function Achievements() {
 const router = useRouter();
 const context = useContext(DataContext);
 const [formData, setFormData] = useState<Achievements[]>([defaultAchievement]);

 useEffect(() => {
     if(context?.data.achievements && context.data.achievements.length > 0){
         setFormData(context.data.achievements);
     }else{
            setFormData([defaultAchievement]);
     }
 },[context?.data.achievements]);


 const updateData = context?.updateData;

 const removeItem = (index: number) => {
    const data = [...formData];
    data.splice(index, 1);
    setFormData(data);
 }

 const handleInputChange = (index: number, field: keyof Achievements, value: string) => {
    const newFormData = formData.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
    );
    setFormData(newFormData);
}

const handlePointChange = (index: number, pointIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = formData.map((item, i) => 
        i === index ? { 
            ...item, 
            points: item.points.map((point, j) => 
                j === pointIndex ? event.target.value : point
            ) 
        } : item
    );
    setFormData(newFormData);
}

const removePoint = (index: number, pointIndex: number) => {
    const newFormData = formData.map((item, i) => 
        i === index ? { 
            ...item, 
            points: item.points.filter((_, j) => j !== pointIndex)
        } : item
    );
    setFormData(newFormData);
}

const addPoint = (index: number) => {
    const newFormData = formData.map((item, i) => 
        i === index ? { 
            ...item, 
            points: [...item.points, ""]
        } : item
    );
    setFormData(newFormData);
}

const addInput = () => {
    setFormData([...formData, { ...defaultAchievement }]);
}

const nextPage = () => {
    if (updateData) {
        updateData("achievements", formData);
    }
    console.log(formData)
    router.push("/skills");
}

  return (
    <> 
        <GridBackground /> 
        <GradientOverlay /> 

        <div className='min-h-screen flex flex-col items-center justify-center text-white px-4'> 
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50, delay: 0.4 },
          }}
        >
          <h1 className="text-4xl text-blue-400 font-semibold tracking-[-2px] mb-6 flex items-center">
            <GrAchievement className="w-8 mr-2" /> Achievements
          </h1>
          <div className="w-[150px] h-1 bg-gradient-to-r from-blue-500 via-blue-300 to-transparent rounded-full mb-6 ml-2" />
        </motion.div>

        <motion.div className='w-full max-w-2xl bg-gray-900 border border-gray-300/30 p-8 rounded-xl shadow-lg mb-4'
        initial={{opacity:0, y:20 }}
        animate={{opacity:1, y: 0,
        transition: {type: "spring", stiffness: 50, delay: 0.4}
        }}>
             {formData.map((value,index) => (
                <div key={index} className='mb-6'> 
                    <div className='flex justify-end'> 
                        {formData.length > 1 && (
                            <button 
                            type='button'
                            onClick={()=> removeItem(index)}
                              className="focus:outline-none text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center"
                            > 
                              <FaTrashAlt className="w-5" />   Delete Achievement
                            </button>
                        )} 
                    </div>

                    <div className='grid gap-3 mb-6 md:grid-cols-1'> 
                    
                    <div> 
            <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                    Achievement Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Oracle Database Foundation"
                    value={value.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
            </div> 

            {value.points.map((point, pointIndex) => (
                <div className='flex flex-row space-x-5 w-full mb-4' key={pointIndex}> 
                    <div className="w-[90%]">
                    <label className="text-base font-semibold tracking-tight text-gray-200 mb-1 flex items-end">
                      Achievement Description <p className='text-sm font-normal ml-1'>( add in points) </p>
                    </label>
                    <input
                      type="text"
                      placeholder="learnt basics of SQL!"
                      value={point}
                      onChange={(e) => handlePointChange(index, pointIndex , e)}
                      className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {value.points.length >= 0 && (
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
                   <div className="focus:outline-none text-white mt-7 bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 h-10 items-center flex justify-center"> 
                      <button onClick={() => addPoint(index)} className='flex items-center'> 
                      <FaPlusCircle className="mr-2" /> description
                    </button>
                 </div>
              </div>
            </div>
         </div>
         ))}
        
        <div className='flex justify-start'> 
      <button onClick={addInput} className='text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-1 flex items-center'> 
      <FaPlusCircle className="mr-2" /> add achievement
        </button>
    </div>

         <div className='w-full flex items-center'>
         <button
              type="button"
              onClick={() => router.back()}
              className="text-white bg-blue-700 font-semibold hover:bg-blue-800 w-[50%] rounded-md text-sm px-5 py-2.5 mr-2 mb-2"
            >
            <Link href="/projects">
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
        </div>

    </>
  )
}
