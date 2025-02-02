"use client";

import { FaLinkedin } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import { GrContactInfo } from "react-icons/gr";

const Hero = () => {
  return (
    <>
      <Navbar />
      <section className="hero mt-[150px] px-4 md:px-8 lg:px-16 w-full mx-auto flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-[-2px] md:tracking-[-3px] lg:tracking-[-5px]">
          Make{" "}
          <span className="text-blue-400">Professional and ATS friendly</span>
        </h1>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-[-2px] md:tracking-[-3px] lg:tracking-[-5px]">
          Resume in just <span className="text-blue-400">5 minutes !!</span>
        </h1>
        <div className="w-full md:w-[500px] lg:w-[700px] h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent mt-3" />

        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mt-4">
          <button className="bg-blue-500 py-2 px-3 hover:bg-blue-600 hover:translate-y-[-2px] duration-150 ease-in-out font-semibold tracking-[-1px] rounded-md border border-slate-50/10 flex items-center">
            <GrContactInfo className="mr-2 h-5" /> Fill data manually
          </button>

          <button
            className="relative bg-blue-500 py-2 px-3 hover:bg-gray-500 cursor-not-allowed font-semibold tracking-[-1px] rounded-md border border-slate-50/10 flex items-center"
            onMouseEnter={(e) => {
              const tooltip = document.createElement("div");
              tooltip.innerHTML = "Feature coming soon, thanks 😊";
              tooltip.className =
                "absolute left-1/2 bottom-full mb-2 bg-gray-700/90 border border-gray-100/20 text-white font-normal text-sm p-2 rounded-md shadow-lg transform -translate-x-1/2 whitespace-nowrap";
              e.currentTarget.appendChild(tooltip);
              e.currentTarget.onmouseleave = () => {
                tooltip.remove();
              };
            }}
          >
            <FaLinkedin className="mr-2 h-5" /> Login with LinkedIn
          </button>
          <button
            className="relative bg-blue-500 py-2 px-3 hover:bg-gray-500 cursor-not-allowed font-semibold tracking-[-1px] rounded-md border border-slate-50/10 flex items-center"
            onMouseEnter={(e) => {
              const tooltip = document.createElement("div");
              tooltip.innerHTML = "Feature coming soon, thanks 😊";
              tooltip.className =
                "absolute left-1/2 bottom-full mb-2 bg-gray-700/90 border border-gray-100/20 text-white font-normal text-sm p-2 rounded-md shadow-lg transform -translate-x-1/2 whitespace-nowrap";
              e.currentTarget.appendChild(tooltip);
              e.currentTarget.onmouseleave = () => {
                tooltip.remove();
              };
            }}
          >
            <FaCloudUploadAlt className="mr-2 h-5" /> Upload old Resume
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
