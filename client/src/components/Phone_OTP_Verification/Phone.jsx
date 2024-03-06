import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import toast from "react-hot-toast";

function Phone() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");

  // Send OTP
  const handleSendOTP = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/phone/send-otp`, {
        phoneNumber,
      });
      if (res.data.responseMsg === "OTP sent") {
        toast.success(res.data.responseMsg);
        setOtp(res.data.otp);
      }
    } catch (err) {
      toast.error(err.response.data.responseMsg);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/phone/verify-otp`, {
        otp,
        userOtp: userOtp,
      });
      if (res.data.responseMsg === "OTP verified") {
        toast.success(res.data.responseMsg);
        // window.location.href = "/";
      }
    } catch (err) {
      toast.error(err.response.data.responseMsg);
    }
  };

  return (
    <>
      {!otp ? (
        <>
          <input
            type="text"
            placeholder="please enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="p-3 rounded-md border-none outline-none shadow-[0_0_2px_gray] bg-transparent"
          />
          <button
            onClick={handleSendOTP}
            className="bg-[#ee5555] text-white font-bold rounded-md p-3 hover:bg-[#e86969] cursor-pointer flex items-center justify-center"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="please enter OTP"
            value={userOtp}
            onChange={(e) => setUserOtp(e.target.value)}
            className="p-3 rounded-md border-none outline-none shadow-[0_0_2px_gray] bg-transparent"
          />
          <button
            onClick={handleVerifyOTP}
            className="bg-[#ee5555] text-white font-bold rounded-md p-3 hover:bg-[#e86969] cursor-pointer flex items-center justify-center"
          >
            Verify OTP
          </button>
        </>
      )}
    </>
  );
}

export default Phone;
