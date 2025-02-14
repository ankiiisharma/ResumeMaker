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
  college: string;
  course: string;
  location: string
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
    personalDetail: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      github: "",
      linkedin: "",
    },
    experience: [],
    education: [],
    projects: [],
    achievements: [],
    skills: [],
  });

  const updateData = <K extends keyof DataType>(
    event: K,
    newData: DataType[K]
  ) => {
    setData((prevData) => ({
      ...prevData,
      [event]: newData,
    }));
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
      experience: [
        {
          company: "",
          role: "",
          location: "",
          date: "",
          points: [],
        },
      ],
      education: [{
        college: "",
        course: "",
        location: "",
        date: "",
      },],
      projects: [{
          name: "",
          techstack: "",
          link: "",
          description: []
      }],
      achievements: [{
        name: "",
        description: [],
      }],
      skills: [],
    });
  };

  return (
    <DataContext.Provider value={{ data, updateData, setDefault }}>
      {children}
    </DataContext.Provider>
  );
};
