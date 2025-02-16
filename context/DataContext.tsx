"use client";

import React, { createContext, useState, ReactNode } from "react";

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

interface Achievements {
  name: string;
  points: string[];
}

export interface Skills {
  skillName: string;
  skillValue: string;
}

export interface DataType {
  personalDetail: PersonalDetailType | null;
  experience: ExperienceType[] | null;
  education: EducationType[] | null;
  projects: Projects[] | null;
  achievements: Achievements[] | null;
  skills: Skills[] | null;
}

interface DataContextType {
  data: DataType;
  updateData: <K extends keyof DataType>(
    event: K,
    newData: DataType[K]
  ) => void;
  setDefault: () => void;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<DataType>({
    personalDetail: null,
    experience: null,
    education: null,
    projects: null,
    achievements: null,
    skills: null
  });

  const updateData = <K extends keyof DataType>(
    event: K,
    newData: DataType[K]
  ) => {
    try {
      console.log(`Updating ${String(event)}:`, newData); // Debug log
      setData((prevData) => {
        const updatedData = {
          ...prevData,
          [event]: newData,
        };
        console.log('Updated state:', updatedData); // Debug log
        return updatedData;
      });
    } catch (error) {
      console.error(`Error updating ${String(event)}:`, error);
    }
  };

  const setDefault = () => {
    setData({
      personalDetail: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        github: "",
        linkedin: "",
      },
      experience: [{
        company: "",
        role: "",
        location: "",
        date: "",
        points: [""]
      }],
      education: [{
        cllgName: "",
        course: "",
        location: "",
        year: "",
      }],
      projects: [{
        projectName: "",
        tech: "",
        link: "",
        points: [""]
      }],
      achievements: [{
        name: "",
        points: [""]
      }],
      skills: [{
        skillName: "",
        skillValue: ""
      }]
    });
  };

  return (
    <DataContext.Provider value={{ data, updateData, setDefault }}>
      {children}
    </DataContext.Provider>
  );
};
