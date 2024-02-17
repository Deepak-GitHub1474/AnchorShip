import { useJob } from "../../../context/context";
import { Navigate } from "react-router-dom";

const EducationalDetails = ({handleChange, userInfo}) => {

  const { user } = useJob();

  return (
    <>
      {user?.email ? (
        <>
          <h1 className="text-center font-bold text-2xl text-blue-500 mb-2">
            Educational Details
          </h1>

          <input
            type="text"
            name="educationFrom"
            placeholder="type (school/college)"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
            onChange={handleChange}
            value={userInfo.educationFrom}
          />
          <input
            type="text"
            name="collegeName"
            placeholder="college name"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
            onChange={handleChange}
            value={userInfo.collegeName}
          />
          <input
            type="date"
            name="collegeStartDate"
            placeholder="college start date"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
            onChange={handleChange}
            value={userInfo.collegeStartDate}
          />
          <input
            type="date"
            name="collegeEndDate"
            placeholder="college end date"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
            onChange={handleChange}
            value={userInfo.collegeEndDate}
          />
        </>
      ) : (
        <Navigate to="/register/login" />
      )}
    </>
  );
};

export default EducationalDetails;
