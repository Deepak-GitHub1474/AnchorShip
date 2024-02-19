import { useJob } from "../../../context/context";
import { Navigate } from "react-router-dom";

const ProjectDetails = ({handleChange, userInfo}) => {

  const { user } = useJob();

  return (
    <>
      {user?.email ? (
        <>
          <h1 className="text-center font-bold xs:text-2xl text-xl text-blue-500 mb-2">
            Project Details
          </h1>

          <input
            type="text"
            name="projectName"
            placeholder="project name"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] bg-transparent"
            onChange={handleChange}
            value={userInfo.projectName}
          />
          <input
            type="text"
            name="projectDescription"
            placeholder="project description"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] bg-transparent"
            onChange={handleChange}
            value={userInfo.projectDescription}
          />
          <input
            type="text"
            name="projectType"
            placeholder="projectType solo/group"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] bg-transparent"
            onChange={handleChange}
            value={userInfo.projectType}
          />
          <input
            type="text"
            name="projectLink"
            placeholder="project link"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] bg-transparent"
            onChange={handleChange}
            value={userInfo.projectLink}
          />
        </>
      ) : (
        <Navigate to="/register/login" />
      )}
    </>
  );
};

export default ProjectDetails;
