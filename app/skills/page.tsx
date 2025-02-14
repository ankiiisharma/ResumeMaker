"use client";
import GradientOverlay from "@/components/ui/GradientOverlay";
import GridBackground from "@/components/ui/GridBackground";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { HiMiniUserGroup } from "react-icons/hi2";
import { DataContext } from "@/context/DataContext";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Skills {
  name: string;
  skills: string;
}

const defaultSkills: Skills = {
  name: "",
  skills: "",
};

export default function Skills() {
  const router = useRouter();
  const context = useContext(DataContext);
  const [formData, setFormData] = useState<Skills[]>([defaultSkills]);

  const removeItem = (index: number) => {
    const data = [...formData];
    if (data.length > 1) {
      data.splice(index, 1);
      setFormData(data);
    }
  };

  const addItem = () => {
    // Create a new skills object instead of referencing the default one
    const newSkills: Skills = {
      name: "",
      skills: ""
    };
    setFormData(prevData => [...prevData, newSkills]);
  };

  const handleChange = (index: number, field: keyof Skills, value: string) => {
    setFormData(prevData => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [field]: value
      };
      return newData;
    });
  };

  useEffect(() => {
    if (context?.data.skills && context.data.skills.length > 0) {
      // Create new objects for each skill section to avoid reference issues
      const initialSkills = context.data.skills.map(skill => ({
        name: skill.name,
        skills: skill.skills
      }));
      setFormData(initialSkills);
    } else {
      setFormData([{ ...defaultSkills }]);
    }
  }, [context?.data.skills]);

  const updateData = context?.updateData;

  const nextPage = () => {
    if (updateData) {
      updateData("skills", formData);
    } else {
      alert("isn't working right now!");
    }
    router.push("/review");
  };

  return (
    <>
      <GridBackground />
      <GradientOverlay />

      <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
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
            <HiMiniUserGroup className="w-8 mr-2" /> Skills
          </h1>
          <div className="w-[150px] h-1 bg-gradient-to-r from-blue-500 via-blue-300 to-transparent rounded-full mb-6 ml-2" />
        </motion.div>

        <motion.div
          className="w-full max-w-2xl bg-gray-900 border border-gray-300/30 p-8 rounded-xl shadow-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50, delay: 0.4 },
          }}
        >
          {formData.map((value, index) => (
            <div className="mb-6" key={index}>
              <div className="flex justify-end">
                {formData.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="focus:outline-none text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center"
                  >
                    <FaTrashAlt className="w-5 mr-2" /> Delete Section
                  </button>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 w-1/3">
                  <label className="block text-base font-semibold tracking-tight text-gray-200 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Languages/Framework/Tools"
                    value={value.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex-1 w-2/3">
                  <label className="block text-base font-semibold tracking-tight text-gray-200 mb-1">
                    Skills
                  </label>
                  <input
                    type="text"
                    placeholder="C++, TypeScript, JavaScript, AWS"
                    value={value.skills}
                    onChange={(e) => handleChange(index, "skills", e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={addItem}
              className="text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-1 flex items-center"
            >
              <FaPlusCircle className="mr-2" /> Add Section
            </button>
          </div>

          <div className="w-full flex items-center">
            <button
              type="button"
              className="text-white bg-blue-700 font-semibold hover:bg-blue-800 w-[50%] rounded-md text-sm px-5 py-2.5 mr-2 mb-2"
            >
              <Link href="/achievements">Previous</Link>
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
  );
}