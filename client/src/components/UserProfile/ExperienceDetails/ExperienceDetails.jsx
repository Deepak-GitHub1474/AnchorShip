import { useJob } from "../../../context/context";
import { Navigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";

const ExperienceDetails = ({ userInfo, setUserInfo, handleChange, readPdfFile, fileUploaded, setFileUploaded}) => {

  const { user, setCoins } = useJob();

  // Upload Covver letter
  const uploadCoverLetter = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      coverLetter: e.target.files[0]
    }));
    if (!userInfo.coverLetter && !fileUploaded.coverLetter) {
      setCoins((prevCoins) => prevCoins + 20);
      setFileUploaded((prevState) => ({ ...prevState, coverLetter: true }));
    }
  }

  return (
    <>
      {user?.email ? (
        <>
          <h1 className="text-center font-bold xs:text-2xl text-xl text-blue-500 mb-2">
            Past Experience details
          </h1>

          <input
            type="text"
            name="experienceType"
            placeholder="experienceType internship/job"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] bg-transparent"
            onChange={handleChange}
            value={userInfo.experienceType}
          />
          <input
            type="text"
            name="companyName"
            placeholder="company name"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] bg-transparent"
            onChange={handleChange}
            value={userInfo.companyName}
          />
          <input
            type="text"
            name="companyWebsiteLink"
            placeholder="company website link"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] bg-transparent"
            onChange={handleChange}
            value={userInfo.companyWebsiteLink}
          />
          <input
            type="text"
            name="role"
            placeholder="role"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] bg-transparent"
            onChange={handleChange}
            value={userInfo.role}
          />

          <input
            type="date"
            name="joiningDate"
            placeholder="joining date"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] bg-transparent w-full"
            onChange={handleChange}
            value={userInfo.joiningDate}
          />
          <input
            type="date"
            name="leavingDate"
            placeholder="leaving date"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] bg-transparent w-full"
            onChange={handleChange}
            value={userInfo.leavingDate}
          />
          <div className="flex justify-between gap-4">
            <label htmlFor="coverLetter" className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] flex items-center gap-2 cursor-pointer flex-1">
              <span>Cover Letter</span>
              <FiUpload className="text-black"/>
            </label>
            {userInfo.coverLetter && 
            <div 
              onClick={() => readPdfFile(userInfo.coverLetter)}
              className="absolute right-1 bg-blue-100 hover:bg-opacity-60 cursor-pointer p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] whitespace-nowrap text-ellipsis overflow-hidden flex-1"
            >
              Cover Letter
            </div>}
          </div>
          <input
            type="file"
            name="coverLetter"
            placeholder="cover letter"
            id="coverLetter"
            className="hidden"
            accept="application/pdf"
            onChange={uploadCoverLetter}
          />
        </>
      ) : (
        <Navigate to="/register/login" />
      )}
    </>
  );
};

export default ExperienceDetails;
