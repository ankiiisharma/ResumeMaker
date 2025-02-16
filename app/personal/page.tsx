"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaUser, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import { motion } from "framer-motion";
import GridBackground from "@/components/ui/GridBackground";
import GradientOverlay from "@/components/ui/GradientOverlay";
// import Link from "next/link";

// Define validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  github: z.string().url("Invalid URL"),
  linkedin: z.string().url("Invalid URL"),
});

type FormData = z.infer<typeof formSchema>;

export default function PersonalDetail() {
  const context = useContext(DataContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: context?.data.personalDetail?.firstName || "",
      lastName: context?.data.personalDetail?.lastName || "",
      email: context?.data.personalDetail?.email || "",
      phoneNo: context?.data.personalDetail?.phoneNo || "",
      github:
        context?.data.personalDetail?.github || "https://github.com/username",
      linkedin:
        context?.data.personalDetail?.linkedin ||
        "https://linkedin.com/in/username",
    },
  });

  if (!context) {
    return <p className="text-red-500">Error: DataContext not found</p>;
  }

  const { data, updateData } = context;
  console.log(data);

  const onSubmit = (formData: FormData) => {
    updateData("personalDetail", formData);
    router.push("/education");
  };
  
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

  return (
    <>
      <GridBackground />
      <GradientOverlay />

      <div
        className="min-h-screen flex flex-col items-center justify-center text-white px-4"      >
        <motion.div className="flex items-center" variants={itemVariants}>
          <h1 className="text-4xl text-blue-400 font-semibold tracking-[-2px] mb-6 flex items-center">
            <FaUser className="w-6 mr-2" /> Personal Information
          </h1>
          <div className="w-[150px] h-1 bg-gradient-to-r from-blue-500 via-blue-300 to-transparent rounded-full mb-6 ml-2" />
        </motion.div>
        <motion.div
          className="w-full max-w-2xl bg-gray-900 border border-gray-300/30 p-8 rounded-xl shadow-lg"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 font-normal">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 font-normal">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 font-normal">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold tracking-tight text-gray-200 items-center mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phoneNo")}
                  className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 98765-43210"
                />
                {errors.phoneNo && (
                  <p className="text-red-500 text-sm mt-1 font-normal">
                    {errors.phoneNo.message}
                  </p>
                )}
              </div>
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-base font-semibold tracking-tight text-gray-200 flex items-center mb-1">
                <FaGithub className="mr-2" /> GitHub
              </label>
              <input
                type="url"
                {...register("github")}
                className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/"
              />
              {errors.github && (
                <p className="text-red-500 text-sm mt-1 font-normal">
                  {errors.github.message}
                </p>
              )}
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-base font-semibold tracking-tight text-gray-200 flex items-center mb-1">
                <FaLinkedin className="mr-2" /> LinkedIn
              </label>
              <input
                type="url"
                {...register("linkedin")}
                className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://linkedin.com/in/"
              />
              {errors.linkedin && (
                <p className="text-red-500 text-sm mt-1 font-normal">
                  {errors.linkedin.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            {/* <Link href="/experience"> */}
              <div className="flex justify-start">
                <button className="bg-blue-500 w-full text-white px-5 py-2 rounded-md flex flex-row items-center hover:bg-blue-800 transition-all duration-150 mt-3 justify-center"
                onSubmit={handleSubmit(onSubmit)}                >
                  <p className="tracking-[-1px] font-semibold flex items-center">
                    Next <MdOutlineNavigateNext className="w-5 h-5 ml-1" />
                  </p>
                </button>
              </div>
            {/* </Link> */}
          </form>
        </motion.div>
      </div>
    </>
  );
}
