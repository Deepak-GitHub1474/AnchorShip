import { useState } from "react";
import { useJob } from "../../context/context";
import AppliedInternshipList from "./AppliedInternshipList/AppliedInternshipList";
import InternshipCards from "./InternshipCards/InternshipCards";
import { GoTriangleDown } from "react-icons/go";

const InternshipPage = () => {
  const[isAppliedListVisible, setIsAppliedListVisible] = useState(false);
  
  const { isLogged } = useJob();

  return (
    <>
      {!isLogged ? (
        <div className="min-h-[90vh] flex items-center justify-center p-2">
          <div className="flex flex-col gap-6 items-center bg-slate-200 rounded-lg border-2 border-gray-300 p-2 w-60">
            <div className="font-semibold">
              <span className="text-xl">Please Wait</span>
              <span className="inline-block animate-bounce ml-1 text-2xl">
                ...
              </span>
            </div>
            <span className="inline-block w-16 h-16 border-4 border-white border-b-[#ee5555] rounded-full animate-spin"></span>
          </div>
        </div>
      ) : (
        <div className="relative">
          <button 
            onClick={() => setIsAppliedListVisible(!isAppliedListVisible)}
            className="bg-[#ee5555] hover:bg-[#e86969] w-[15rem] pl-2 pr-6 py-2 font-semibold text-white absolute top-3 left-3 flex items-center"
          >
            <span>{!isAppliedListVisible ? "Check Applied Internships" : "Go TO Internship Page"}</span>
            <GoTriangleDown size={28} className={`transition-all duration-700 absolute right-1 top-2 text-slate-200 ${isAppliedListVisible && " rotate-180"}`}/>
          </button>
          <>
            {!isAppliedListVisible ? 
              <InternshipCards /> 
              :
              <AppliedInternshipList />
            }
          </>
        </div>
      )}
    </>
  );
};

export default InternshipPage;
