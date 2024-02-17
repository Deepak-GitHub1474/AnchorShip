import axios from "axios";
import { useEffect, useState } from "react";
import { useJob } from "../../../context/context";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../../config/config";

const AppliedInternshipList = () => {
  const [internshipList, setInternshipList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useJob();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/applied/internship/list`, { withCredentials: true })
      .then((res) => {
        setInternshipList(res.data.internshipInfo);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {user?.email ? (
        <>
        {loading ? 
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
      </div> :
        <div className="flex items-center justify-center flex-wrap gap-6 px-2 pt-20 pb-8">
          {internshipList.map((internship) => (
            <div
              key={internship.internshipId}
              className="flex max-h-52 min-h-52 xs:max-w-80 xs:min-w-80 w-[95vw] p-4 rounded-lg shadow-[0_1px_2px_gray] hover:bg-slate-100 relative overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                <img
                  src={internship.companyLogo}
                  alt="logo"
                  className="max-w-28 min-w-28"
                />
                <div>
                  <h1 className="font-semibold text-lg">
                    {internship.roleName}
                  </h1>
                  <p className="text-sm text-gray-500 ">
                    {internship.companyName}
                  </p>
                </div>
                <div className=" bg-[#fdeded] rounded-md px-2">
                  {`₹10000 - ₹${internship.stipend}`}
                </div>
                <h2 className=" font-semibold text-sm">{`Experience Required: ${internship.experienceRequired}`}</h2>
              </div>
              <button className=" absolute bottom-0 left-0 right-0 bg-[#ee5555] hover:bg-blue-600 py-1 text-white font-semibold">
                {`${internship.coinsSpent} coins spent`}
              </button>
            </div>
          ))}
        </div>
      }
        </>
      ) : (
        <Navigate to="/register/login" />
      )}
    </>
  );
};

export default AppliedInternshipList;
