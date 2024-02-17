import {useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../../config/config";
import { useJob } from "../../../context/context";

const PersonalDetails = ({userInfo, setUserInfo, handleChange, readPdfFile, fileUploaded, setFileUploaded}) => {

  const { user, setCoins } = useJob();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);

  // Converting image base64
  const convertImgBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject("Error while convertImgBase64", error);
      };
    });
  };

  // getting avatar's cloudinary url
  const uploadAvatar = (base64) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/uploadImage`, { avatar: base64 })
      .then((res) => {
        console.log(res);
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          avatar: res.data.avatar,
        }));
        setPreviewImage(true);
        if (!userInfo.avatar && !fileUploaded.avatar) {
          setCoins((prevCoins) => prevCoins + 10);
          setFileUploaded((prevState) => ({ ...prevState, avatar: true }));
        }
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch((err) => console.log("catch uploadAvatar", err.message));
  }

  // upload image from device
  const uploadImage = async (event) => {
    setPreviewImage(false); // If change the uploaded photo
    const files = event.target.files;
    const base64 = await convertImgBase64(files[0]);
    uploadAvatar(base64);
    return;
  };

  // Upload Resume
  const uploadResume = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      resume: e.target.files[0]
    }));
    if (!userInfo.resume && !fileUploaded.resume) {
      setCoins((prevCoins) => prevCoins + 20);
      setFileUploaded((prevState) => ({ ...prevState, resume: true }));
    }
  }

  // // Read PDF
  //  const readPdfFile = async (fileName) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/files/${fileName}`, {
  //       responseType: 'arraybuffer', // Set the responseType to arraybuffer
  //     });
  //     console.log(response);
  //     const blob = new Blob([response.data], { type: 'application/pdf' });
  //     const url = URL.createObjectURL(blob);
  //     window.open(url, '_blank');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
      {user?.email ? (
        <>
          <h1 className="text-center font-bold text-2xl text-blue-500 mt-10">
            Personal Details
          </h1>
          <label
            htmlFor="avatar"
            className={`w-20 h-20 mx-auto cursor-pointer rounded-full object-contain overflow-hidden
            }`}
          >
            {previewImage ? (
              <img src={userInfo.avatar} />
            ) : (
              <>
                {loading ? (
                  <AiOutlineLoading3Quarters
                    size={80}
                    className=" animate-spin"
                  />
                ) : (
                  <>
                    {!userInfo.avatar ? 
                    <BsPersonCircle size={80} />
                    :
                    <img src={userInfo.avatar} />
                  }
                  </>
                )}
              </>
            )}
          </label>
          <input
            onChange={uploadImage}
            type="file"
            name="avatar"
            id="avatar"
            accept=".jpg, .jpeg, .png, .svg"
            className="hidden"
          />
          <input
            type="text"
            name="name"
            placeholder="name"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
            onChange={handleChange}
            value={userInfo.name}
          />
          <input
            type="text"
            name="mobile"
            placeholder="mobile"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
            onChange={handleChange}
            value={userInfo.mobile}
          />
          <input
            type="text"
            name="linkedin"
            placeholder="linkedin"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
            onChange={handleChange}
            value={userInfo.linkedin}
          />
          <input
            type="text"
            name="github"
            placeholder="github"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
            onChange={handleChange}
            value={userInfo.github}
          />
          <div className="flex justify-between gap-4">
            <label htmlFor="resume" className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] flex items-center gap-2 cursor-pointer flex-1">
              <span>Upload Resume</span>
              <FiUpload className="text-black"/>
            </label>
            {userInfo.resume && 
            <div 
              onClick={() => readPdfFile(userInfo.resume)}
              className="bg-green-100 hover:bg-opacity-60 cursor-pointer p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] whitespace-nowrap text-ellipsis overflow-hidden max-w-60 min-w-60"
            >
              Resume
            </div>}
          </div>
          
          <input
            type="file"
            name="resume"
            placeholder="resume"
            id="resume"
            className="hidden"
            accept="application/pdf"
            onChange={uploadResume}
          />
        </>
      ) : (
        <Navigate to="/register/login" />
      )}
    </>
  );
};

export default PersonalDetails;
