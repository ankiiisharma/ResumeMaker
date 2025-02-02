import GridBackground from "@/components/ui/GridBackground";
import GradientOverlay from "@/components/ui/GradientOverlay";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { GoArrowUpRight } from "react-icons/go";

const page = () => {
  return (
    <div className="h-screen overflow-hidden">
      {/* Added this wrapper div */}
      <GradientOverlay />
      <GridBackground />
      <Navbar />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-[100px] px-4 md:px-8 lg:px-16 w-full mx-auto">
        <div>
          <Image
            src="/resume.jpg"
            alt="Preview"
            width={800}
            height={400}
            className="rounded-lg border border-double border-gray-600/40 rotate-[3deg] shadow-lg"
          />
        </div>

        <div className="mt-5">
          <h1 className="text-2xl md:text-3xl lg:text-6xl font-bold tracking-tighter md:tracking-[-1px] lg:tracking-[-4px] text-blue-400">
            i know this is what you
            <span className="underline decoration-gray-300/50 flex items-center">
              were looking for!{" "}
              <Image
                src="/sunGlass.png"
                alt="Sun Glass"
                width={50}
                height={50}
                className="rotate-[1deg] ml-1"
              />
            </span>
          </h1>

          <p className="text-slate-200 text-2xl mt-2 tracking-[-1px] font-semibold hover:text-slate-300 transition-all duration-500">
            The resume format is widely used by professionals. It showcases your
            education, projects, experiences, and achievements in a
            chronological way with a good design. It is easily scanned by
            Applicant Tracking Systems (ATS).
          </p>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-md flex flex-row items-center hover:bg-blue-800 hover:translate-y-[-1px] transition-all duration-150">
              <p className="tracking-[-1px] font-semibold flex items-center">
                <GoArrowUpRight className="mr-1" /> start making your own.
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
