import Link from "next/link";
import { FaGithub, FaEye } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-3 px-5 shadow-sm bg-slate-50 bg-opacity-50 border border-slate-50/80 rounded-md mx-auto mt-10 w-11/12 max-w-4xl">
      <Link href="/">
        <h1 className="text-3xl tracking-tighter font-bold text-blue-900">
          resumemaker.app
        </h1>
      </Link>
      <div className="flex gap-4 items-center">
        <button className="bg-blue-500 text-white px-5 py-2 rounded-md flex flex-row items-center hover:bg-blue-800 hover:translate-y-[-1px] transition-all duration-150">
          <p className="tracking-tighter"> star this on </p>{" "}
          <FaGithub className="ml-2" />
        </button>

        <div> | </div>

        <Link href="/preview">
          <button className="bg-blue-500 text-white px-5 py-2 rounded-md flex flex-row items-center hover:bg-blue-800 hover:translate-y-[-1px] transition-all duration-150">
            <p className="tracking-tighter"> preview </p>
            <FaEye className="ml-2" />
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
