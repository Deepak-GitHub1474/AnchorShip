import { BASE_URL } from "../../config/config";
import { MdMarkEmailRead } from "react-icons/md";


import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useJob } from "../../context/context";

const RegisterLogin = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const {user, isLogged} = useJob();

  // Send OTP
  const sendOtp = () => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/sendotp`, { email })
      .then((res) => {
        if (res.data.responseMsg === "OTP sent") {
          console.log(res);
          setIsLoading(false);
          setIsOtpVerified(true);
          alert(res.data.responseMsg);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        alert(err.response.data.responseMsg);
      });
  };

  // Verify OPT & Login/Register
  const verifyOtpAndRegister = () => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/verifyOtp/register`, {userOtp})
      .then((res) => {
        if (res.data.responseMsg === "OTP verified") {
          setIsLoading(false);
          alert(res.data.responseMsg);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        alert(err.response.data.responseMsg);
      });

  };

  return (
    <>
    {!user.email ?
      <div className="min-h-screen flex items-center justify-center px-2 overflow-hidden bg-white">
      <img
        src="https://res.cloudinary.com/dlt4ash36/image/upload/v1707731235/signin-banner_ut0tkk.svg"
        alt="bg-img"
        className="h-[100vh] xl:flex hidden fixed top-0 translate -translate-x-[22%]"
      />
      
      <div className="flex flex-col gap-4 sm:w-[500px] w-[95vw] py-4 px-2 rounded-lg xl:absolute xl:right-4 xl:top-8 relative z-50">
        {!isOtpVerified ?
          <>
          <img
            src="https://res.cloudinary.com/dlt4ash36/image/upload/v1707741622/developerstring_bn169n.png"
            alt="logo"
            className="w-44 xl:relative xl:top-0 fixed top-20"
          />
          <h1 className="text-center font-bold text-2xl">
            Get Onboard and jumpstart your career!
          </h1>
          <p className="text-center text-slate-500">
            Please enter your email id to login/register
          </p>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_2px_gray]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={sendOtp}
            className="bg-[#ee5555] text-white font-bold rounded-md p-3 hover:bg-[#e86969] cursor-pointer flex items-center justify-center"
          >
            {!isLoading ? "Send OTP" : "Sending OTP..."}
          </button>
        </>

          :

        <>
          <img
            src="https://res.cloudinary.com/dlt4ash36/image/upload/v1707741622/developerstring_bn169n.png"
            alt="logo"
            className="w-44 xl:relative xl:top-0 fixed top-20"
          />
          <h1 className="text-center font-bold text-2xl">Just One More Step</h1>
          <p className="text-center text-slate-500">
            Please enter the OTP sent to your email
          </p>
          <div className="text-center flex items-center justify-center gap-4">
            <span className="font-semibold">{email}</span>
            <span className="text-[#ee5555] text-xl">
              <MdMarkEmailRead />
            </span>
          </div>
          <input
            type="text"
            name="otp"
            placeholder="please enter otp"
            className="p-3 rounded-md border-none outline-none shadow-[0_0_2px_gray]"
            onChange={(e) => setUserOtp(e.target.value)}
          />
          <div className="flex items-center justify-center gap-4 text-[0.85rem] text-slate-500 my-4">
            <span>
              00:00 | Didn’t get an OTP?
            </span>
            <button 
              onClick={sendOtp}
              className="font-semibold rounded-md px-2 py-1 hover:bg-[#f1cccc] hover:text-black  cursor-pointer flex items-center justify-center"
            >
              Resend OTP
            </button>
          </div>
          <button
            onClick={verifyOtpAndRegister}
            className="bg-[#ee5555] text-white font-bold rounded-md p-3 hover:bg-[#e86969] cursor-pointer flex items-center justify-center"
          >
            {!isLoading ? "Continue" : "Verifying..."}
          </button>
        </>
        }
      </div>
    </div>
    :
      <Navigate to="/" />
    }
    </>
    
  );
};

export default RegisterLogin;