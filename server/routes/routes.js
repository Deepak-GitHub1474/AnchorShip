const express = require("express");

const {
    sendOtp,
    verifyOtpAndRegister,
    userActionController,
    UserLogout,
    uploadImage,
    createUserProfile,
    getUserProfile,
    createInternship,
    getAppliedInternships,
    readPdfFile,
} = require("../controllers/controller");

const {
    sendPhoneOTP,
    verifyPhoneOTP,
} = require("../controllers/phone_otp_verification");

const { sendOtpValidation, otpValidation, sendPhoneOTPValidation, verifyPhoneOTPValidation, verifyUser } = require("../middlewares/user-validation");
const { handlePdfUpload} = require("../middlewares/file-upload");

const route = express.Router();

// Home
route.get("/", verifyUser, userActionController);

// Send OTP
route.post("/sendotp", sendOtpValidation, sendOtp);

// OTP Validation & Login/Register
route.post("/verifyOtp/register", otpValidation, verifyOtpAndRegister);

// Phone otp 
route.post("/phone/send-otp", sendPhoneOTPValidation, sendPhoneOTP);

// Phone otp verification
route.post("/phone/verify-otp", verifyPhoneOTPValidation, verifyPhoneOTP);

// User Logout
route.get("/logout", UserLogout);

// Upload Avatar
route.post("/uploadImage", uploadImage);

// Create User Profile
route.post("/user/create/profile", handlePdfUpload(), createUserProfile);

// Get User Profile
route.get("/user/profile", getUserProfile);

// Applied Internships
route.post("/apply/internship", createInternship);

// Applied Internships List
route.get("/applied/internship/list", getAppliedInternships);

// Reading PDF
route.get("/files/:fileName", readPdfFile);


module.exports = route;