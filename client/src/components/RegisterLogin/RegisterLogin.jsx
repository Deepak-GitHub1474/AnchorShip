import { BASE_URL } from "../../config/config";
import { MdMarkEmailRead } from "react-icons/md";

import { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useJob } from "../../context/context";
import toast from "react-hot-toast";

const RegisterLogin = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const { user } = useJob();
  const otpInputs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [restart, setRestart] = useState(false);

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
          setTimer(60);
          setRestart(!restart);
          toast.success(res.data.responseMsg);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error(err.response.data.responseMsg);
      });
  };

  // Verify OPT & Login/Register
  const verifyOtpAndRegister = () => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/verifyOtp/register`, { userOtp })
      .then((res) => {
        if (res.data.responseMsg === "OTP verified") {
          setIsLoading(false);
          toast.success(res.data.responseMsg);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error(err.response.data.responseMsg);
      });
  };

  // Function to handle OTP input
  const handleOtpInputChange = (index, value) => {
    // If value is empty and backspace is pressed, move to previous input box
    if (!value && index > 0) {
      otpInputs.current[index - 1].focus();
    }
    // Move to next input box if value is entered
    else if (value && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }
    // Set userOtp state
    setUserOtp((prev) => {
      const otp = prev.split("");
      otp[index] = value;
      return otp.join("");
    });
  };

  // Countdown timer effect
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [restart]);

  // Function to format time to mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Back
  const handleBack = () => {
    setIsOtpVerified(false);
    window.location.href = "/register/login";
  };

  return (
    <>
      {!user.email ? (
        <div className="min-h-[80vh] flex items-center justify-center px-2 overflow-hidden bg-white">
          <img
            src="https://res.cloudinary.com/dlt4ash36/image/upload/v1707731235/signin-banner_ut0tkk.svg"
            alt="bg-img"
            className="h-[100vh] xl:flex hidden fixed top-0 translate -translate-x-[22%]"
          />

          <div className="flex flex-col gap-4 sm:w-[500px] w-[95vw] py-10 px-2 rounded-lg xl:absolute xl:right-4 top-8 relative z-50">
            {!isOtpVerified ? (
              <>
                <img
                  src="https://res.cloudinary.com/dlt4ash36/image/upload/v1707741622/developerstring_bn169n.png"
                  alt="logo"
                  className="w-44"
                />
                <h1 className="text-center font-bold text-2xl text-gray-950">
                  Get Onboard and jumpstart your career!
                </h1>
                <p className="text-center text-slate-500">
                  Please enter your email id to login/register
                </p>
                <input
                  type="email"
                  name="email"
                  placeholder="please enter email"
                  className="p-3 rounded-md border-none outline-none shadow-[0_0_2px_gray] bg-transparent"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={sendOtp}
                  className="bg-[#ee5555] text-white font-bold rounded-md p-3 hover:bg-[#e86969] cursor-pointer flex items-center justify-center"
                >
                  {!isLoading ? "Send OTP" : "Sending OTP..."}
                </button>
              </>
            ) : (
              <>
                <button onClick={handleBack} className="fixed top-6 left-6 flex items-center opacity-60 hover:opacity-100">
                  <span className=" font-bold text-3xl mb-1">←</span>
                  <span>Back</span>
                </button>
                <img
                  src="https://res.cloudinary.com/dlt4ash36/image/upload/v1707741622/developerstring_bn169n.png"
                  alt="logo"
                  className="w-44"
                />
                <h1 className="text-center font-bold text-2xl text-gray-950">
                  Just One More Step
                </h1>
                <p className="text-center text-slate-500">
                  Please enter the OTP sent to your email
                </p>
                <div className="text-center flex items-center justify-center gap-4">
                  <span className="font-semibold text-gray-950">{email}</span>
                  <span className="text-[#ee5555] text-xl">
                    <MdMarkEmailRead />
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputs.current[index] = el)}
                      type="password"
                      inputMode="numeric"
                      name="otp"
                      className="max-w-12 text-center py-3 px-1 rounded-md border-none outline-none shadow-[0_0_2px_gray] bg-transparent"
                      value={userOtp[index] || ""}
                      onChange={(e) =>
                        handleOtpInputChange(index, e.target.value)
                      }
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 text-[0.85rem] text-slate-500 my-4">
                  <div>
                    <span>{`${formatTime(timer)} | `}</span>
                    <>
                      {timer === 0 ? (
                        <span>Didn’t get an OTP?</span>
                      ) : (
                        <span className="text-green-600">
                          OTP has been sent.
                        </span>
                      )}
                    </>
                  </div>
                  {timer === 0 && (
                    <button
                      onClick={sendOtp}
                      className="font-semibold rounded-md px-2 py-1 hover:bg-[#f1cccc] hover:text-black"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
                <button
                  onClick={verifyOtpAndRegister}
                  disabled={timer === 0 || userOtp.length !== 6}
                  className={`bg-[#ee5555] text-white font-bold rounded-md p-3  cursor-pointer flex items-center justify-center ${
                    timer === 0 || userOtp.length !== 6
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {!isLoading ? "Continue" : "Verifying..."}
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RegisterLogin;
