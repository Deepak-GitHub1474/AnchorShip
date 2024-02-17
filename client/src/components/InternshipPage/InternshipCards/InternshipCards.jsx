import { Navigate } from "react-router-dom";
import internshipData from "./internshipdata";
import { useJob } from "../../../context/context";
import axios from "axios";
import { BASE_URL } from "../../../config/config";

const InternshipCards = () => {
  const { user, coins, setCoins, } = useJob();

  const applyForInternship = (id) => {
    const internshipInfo = internshipData[id];
    internshipInfo["coinsSpent"] = 50;
    internshipInfo["userEmailId"] = user.email;

    if (coins >= 50) {
      axios
        .post(`${BASE_URL}/apply/internship`, internshipInfo)
        .then((res) => {
          // setCoins((prevCoins) => prevCoins - 50);
          alert(res.data.responseMsg);
          console.log(res);
        })
        .catch((err) => {
          alert(err.data.responseMsg);
          console.log(err);
        });
    } else {
      alert("Oops! You don't have sufficient coins to apply.");
    }
  };

  return (
    <>
      {user?.email ? (
        <div className="flex items-center justify-center flex-wrap gap-6 px-2 pt-20 pb-8">
          {internshipData.map((internship) => (
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
    </>
  );
};

export default InternshipCards;
