"use client";

import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "@/context/DataContext";
import { motion } from "framer-motion";
import GridBackground from "@/components/ui/GridBackground";
import GradientOverlay from "@/components/ui/GradientOverlay";
import { AiTwotoneExperiment } from "react-icons/ai";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";

type FormData = {
  company: string;
  role: string;
  location: string;
  date: string;
  points: string[];
};

// const defaultExperience: FormData = {
//   company: "",
//   role: "",
//   location: "",
//   date: "",
//   points: [""],
// };

export default function Experience() {
  const context = useContext(DataContext);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData[]>([]);

  useEffect(() => {
    if (context?.data.experience && context.data.experience.length > 0) {
      setFormData(context.data.experience);
    } else {
      const initialExperience: FormData = {
        company: "",
        role: "",
        location: "",
        date: "",
        points: [""]
      };
      setFormData([initialExperience]);
    }
  }, [context?.data.experience]);

  if (!context) {
    return <p className="text-red-500">Error: DataContext not found</p>;
  }

  const { updateData } = context;

  const addInput = () => {
    const newExperience: FormData = {
      company: "",
      role: "",
      location: "",
      date: "",
      points: [""]
    };
    setFormData([...formData, newExperience]);
  };

  const nextPage = () => {
    updateData("experience", formData);
    router.push("/projects");
  };

  const handleFormChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = [...formData];
    const fieldName = event.target.name as keyof FormData;
    
    // Remove the points handling from here since we have a separate handler for points
    data[index] = {
      ...data[index],
      [fieldName]: event.target.value
    };
    setFormData(data);
  };

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

  return (
    <>
      <GridBackground />
      <GradientOverlay />

      <motion.div
        className="min-h-screen flex flex-col items-center justify-start pt-10 text-white px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 50, delay: 0.2 },
        }}
      >
        <motion.div
          className="flex items-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50, delay: 0.4 },
          }}
        >
          <h1 className="text-2xl text-blue-400 font-semibold tracking-[-1px] flex items-center">
            <AiTwotoneExperiment className="w-6 mr-2" /> Experience
          </h1>
          <div className="w-[100px] h-0.5 bg-gradient-to-r from-blue-500 via-blue-300 to-transparent rounded-full ml-2" />
        </motion.div>
        <motion.div
          className="w-full max-w-3xl bg-gray-900 border border-gray-300/30 p-8 rounded-xl shadow-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50, delay: 0.4 },
          }}
        >
          {formData.map((value, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-end">
                {formData.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="focus:outline-none text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center"
                  >
                    <FaTrashAlt className="w-5" /> Delete this experience
                  </button>
                )}
              </div>
              <div className="grid gap-3 mb-6 md:grid-cols-2">
                <div>
                  <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={value.company}
                    onChange={(e) => handleFormChange(index, e)}
                    className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={value.role}
                    onChange={(e) => handleFormChange(index, e)}
                    className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={value.location}
                    onChange={(e) => handleFormChange(index, e)}
                    className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    placeholder="Jan. 2024 - Dec. 2025"
                    value={value.date}
                    onChange={(e) => handleFormChange(index, e)}
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
                    <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                      Work Experience / Description
                    </label>
                    <input
                      type="text"
                      placeholder="broke the production twice in a month! (of course, not this)"
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

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => addPoint(index)}
                  className="text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-1 flex items-center"
                >
                  <FaPlusCircle className="mr-2" />
                  Add Another Point
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={addInput}
              className="focus:outline-none text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center"
            >
              <FaPlusCircle className="mr-1 w-6" />
              Add Another Experience
            </button>
          </div>

          <div className="w-full justify-center flex mt-2">
            <button
              type="button"
              className="text-white bg-blue-700 font-semibold hover:bg-blue-800 w-[50%] rounded-md text-sm px-5 py-2.5 mr-2 mb-2"
            >
              <Link href="/education">Previous</Link>
            </button>

            <button
              type="button"
              onClick={nextPage}
              className="text-white bg-blue-700 font-semibold hover:bg-blue-800 w-[50%] rounded-md text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Next
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}