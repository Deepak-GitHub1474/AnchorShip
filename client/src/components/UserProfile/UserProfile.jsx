import { useJob } from "../../context/context";
import { BASE_URL } from "../../config/config";

import { useEffect, useState } from "react";
import axios from "axios";

import PersonalDetails from "./PersonalDetails/PersonalDetails";
import EducationalDetails from "./EducationalDetails/EducationalDetails";
import ProjectDetails from "./ProjectDetails/ProjectDetails";
import ExperienceDetails from "./ExperienceDetails/ExperienceDetails";

const UserProfile = () => {
  const { user, isLogged, coins, setCoins, refresh, updateDashBoard } = useJob();

  const [userInfo, setUserInfo] = useState({
    avatar: "",
    name: "",
    mobile: "",
    linkedin: "",
    github: "",
    resume: "",
    educationFrom: "",
    collegeName: "",
    collegeStartDate: "",
    collegeEndDate: "",
    projectName: "",
    projectDescription: "",
    projectType: "",
    projectLink: "",
    experienceType: "",
    companyName: "",
    companyWebsiteLink: "",
    role: "",
    joiningDate: "",
    leavingDate: "",
    coverLetter: "",
  });

  const coinValues = {
    name: 2,
    mobile: 2,
    avatar: 10,
    linkedin: 3,
    github: 5,
    resume: 20,
    educationFrom: 5,
    collegeName: 5,
    collegeStartDate: 2,
    collegeEndDate: 2,
    projectName: 5,
    projectDescription: 6,
    projectType: 4,
    projectLink: 10,
    experienceType: 5,
    companyName: 10,
    companyWebsiteLink: 10,
    role: 8,
    joiningDate: 2,
    leavingDate: 2,
    coverLetter: 20,
  };

  const [fileUploaded, setFileUploaded] = useState({
    avatar: false,
    resume: false,
    coverLetter: false,
  });

  // Send Personal Details
  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));

    // Add coin
    if (coinValues.hasOwnProperty(name) && !userInfo[name]) {
      setCoins((prevCoins) => prevCoins + coinValues[name]);
    }

    // Substract coin
    if (userInfo.hasOwnProperty(name) && userInfo[name] !== "" && value === "") {
      setCoins((prevCoins) => prevCoins - coinValues[name]);
    }
  };

  // Submit User Info Form
  const createUserProfile = async (e) => {
    e.preventDefault();

    try {
      const userData = { ...userInfo, userEmailId: user.email, coins: coins };
      const res = await axios.post(`${BASE_URL}/user/create/profile`, 
        userData,
        {headers: {"Content-Type": "multipart/form-data",},}
      );
      alert(res.data.responseMsg);
    } catch (err) {
      alert(err.data.responseMsg);
    }
  };

// Fetch updated user profile
const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user/profile`);
    const filterUser = res.data.find(profile => profile.userEmailId === user.email);
    if (filterUser) {
      setUserInfo(filterUser);
      setCoins(filterUser.coins)
    } else {
      setUserInfo({ ...userInfo });
    }
  } catch (err) {
    console.log(err);
  }
};

// Get all user profile
useEffect(() => {
  fetchUserProfile();
}, [refresh]);

// Read PDF
const readPdfFile = async (fileName) => {
  try {
    const response = `${BASE_URL}/files/${fileName}`;
    window.open(response, '_blank');
  } catch (error) {
    console.log(error);
  }
}

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
        <div className="flex flex-col items-center justify-center gap-8 py-8 px-2">
          {!userInfo.userEmailId && <div onClick={() => updateDashBoard()} className="bg-blue-100 hover:bg-blue-200 p-2 cursor-pointer font-semibold">Fetch Existing Information</div>}
          <form
            onSubmit={createUserProfile}
            className="flex flex-col gap-4 sm:w-[500px] w-[95vw] pb-4 pt-4 px-2 rounded-lg shadow-[0_0_2px_gray] relative overflow-hidden"
          >
            <div className="bg-[#ee5555] absolute top-0 left-0 right-0 p-2 text-2xl text-white font-semibold flex items-center justify-center gap-4">
              Create Profile To Earn Coins
            </div>
            <PersonalDetails
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              handleChange={handleChange}
              readPdfFile={readPdfFile}
              fileUploaded={fileUploaded}
              setFileUploaded={setFileUploaded}
            />
            <EducationalDetails
              userInfo={userInfo}
              handleChange={handleChange}
            />
            <ProjectDetails 
              userInfo={userInfo} 
              handleChange={handleChange} 
            />
            <ExperienceDetails
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              handleChange={handleChange}
              readPdfFile={readPdfFile}
              fileUploaded={fileUploaded}
              setFileUploaded={setFileUploaded}
            />
            <button className="bg-blue-600 text-white font-bold rounded-md p-3 hover:bg-blue-500 cursor-pointer flex items-center justify-center">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UserProfile;
