import { Navigate } from "react-router-dom";
import internshipData from "./internshipdata";
import { useJob } from "../../../context/context";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../config/config";
import { useState } from "react";

const InternshipCards = () => {
  const { user, coins, setCoins, } = useJob();

  const [currentPage, setCurrentPage] = useState(1);
  const internshipsPerPage = 10;
  const totalPages = Math.ceil(internshipData.length / internshipsPerPage);

  // Apply Internship
  const applyForInternship = (id) => {
    const internshipInfo = internshipData[id];
    internshipInfo["coinsSpent"] = 50;
    internshipInfo["userEmailId"] = user.email;

    if (coins >= 50) {
      axios
        .post(`${BASE_URL}/apply/internship`, internshipInfo)
        .then((res) => {
          // setCoins((prevCoins) => prevCoins - 50);
          toast.success(res.data.responseMsg);
        })
        .catch((err) => {
          toast.error(err.data.responseMsg);
        });
    } else {
      toast.error("Oops! You don't have sufficient coins to apply.");
    }
  };

  // Next Page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Previous Page
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastInternship = currentPage * internshipsPerPage;
  const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage;
  const currentInternships = internshipData.slice(
    indexOfFirstInternship,
    indexOfLastInternship
  );

  return (
    <>
      {user?.email ? (
        <div className="flex items-center justify-center flex-wrap gap-6 px-2 pt-24">
          {currentInternships.map((internship) => (
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
                  <h1 className="font-semibold text-lg text-gray-950">
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
              <button
                onClick={() => applyForInternship(internship.internshipId)}
                className=" absolute bottom-0 left-0 right-0 bg-[#ee5555] hover:bg-blue-600 py-1 text-white font-semibold"
              >
                Apply Using 50 Coins
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Navigate to="/register/login" />
      )}
      <div className="flex justify-center gap-10 py-12">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-6 py-1 bg-gray-900 text-white rounded-md ${currentPage === 1 ? "cursor-not-allowed opacity-40": "hover:bg-gray-700"}`}
        >
          {`< Prev`}
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-6 py-1 bg-gray-900 text-white rounded-md ${currentPage === totalPages ? "cursor-not-allowed opacity-40": "hover:bg-gray-700"}`}
        >
          {`Next >`}
        </button>
      </div>
    </>
    
  );
};

export default InternshipCards;
