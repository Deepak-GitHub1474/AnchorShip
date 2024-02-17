const User = require("../models/user-model");
const UserProfile = require("../models/user-profile");
const ApplyInternship = require("../models/applied-internships");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

var sentOtp = null;
var userEmail = null;

// User access control
exports.userActionController = (req, res) => {
  return res.status(200).json({ email: req.email, });
}

// Send OTP
exports.sendOtp = async (req, res) => {

  const { email } = req.body;

  try {
    const verificationCode = Math.floor(Math.random() * 1000000);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: `OTP :${verificationCode}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ responseMsg: "Error sending verification email" });
      } else {
        console.log(`Email sent: ${info.response}, OTP: ${verificationCode}`);
        sentOtp = verificationCode;
        userEmail = email;
        res.status(200).json({ sentOtp: `${verificationCode}`, responseMsg: "OTP sent", email: email });
      }
    });

  } catch (error) {
    res.status(500).json(`Email is required: ${error}`);
  }

}

// OTP Validation & Login/Register
exports.verifyOtpAndRegister = async (req, res) => {

  const { userOtp } = req.body;

  if (sentOtp === parseInt(userOtp)) {

    User.findOne({ email: userEmail })
      .then(existingUser => {
        if (existingUser) {
          const token = jwt.sign({ email: existingUser.email },
            process.env.JWT_SECRET, { expiresIn: "1d" });
          res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.CORS_SAME_SITE,
            secure: true,
            path: '/'
          });
          res.status(200).json({ responseMsg: "OTP verified", user: existingUser });
        } else {
          User.create({ email: userEmail })
            .then(user => {
              // console.log("User Create ====>", user);
              const token = jwt.sign({ email: user.email },
                process.env.JWT_SECRET, { expiresIn: "1d" });
              res.cookie("token", token, {
                httpOnly: true,
                sameSite: process.env.CORS_SAME_SITE,
                secure: true,
                path: '/'
              });
              res.status(200).json({ responseMsg: "OTP verified", userRegister: "Successfully registered", user: user });
            })
            .catch(err => res.json(err))
        }
      })
      .catch(err => res.json(err));
  } else {
    res.status(401).json({ responseMsg: "Wrong OTP" });
  }
}

// User Logout
exports.UserLogout = (req, res) => {

  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: process.env.CORS_SAME_SITE,
    secure: true,
    path: '/'
  });
  return res.status(200).json({ responseMsg: "Success" });
};

// Upload Avatar
exports.uploadImage = (req, res) => {

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const avatar = req.body.avatar;

  try {
    cloudinary.uploader.upload(avatar, (error, result) => {
      if (result && result.secure_url) {
        res.status(200).json({ avatar: result.secure_url });
      } else {
        res.status(500).json(`Error while uploading avatar: ${error.message}`);
      }
    });
  } catch (error) {
    res.status(500).json(`Error while processing avatar upload: ${error.message}`);
  }
};

// Create User Profile
exports.createUserProfile = async (req, res) => {

  try {
    const {
      name,
      avatar,
      mobile,
      linkedin,
      github,
      educationFrom,
      collegeName,
      collegeStartDate,
      collegeEndDate,
      projectName,
      projectDescription,
      projectType,
      projectLink,
      experienceType,
      companyName,
      companyWebsiteLink,
      role,
      joiningDate,
      leavingDate,
      userEmailId,
      coins,
    } = req.body;

    const resumeFile = req.files["resume"] ? req.files["resume"][0] : null;
    const coverLetterFile = req.files["coverLetter"] ? req.files["coverLetter"][0] : null;
    const resume = resumeFile ? resumeFile.filename : "";
    const coverLetter = coverLetterFile ? coverLetterFile.filename : "";

    const existingUser = await UserProfile.findOne({ userEmailId: userEmailId })

    if (existingUser) {
      const userProfile = await UserProfile.findOneAndUpdate({ userEmailId },
        {
          $set: {
            avatar: avatar,
            name: name,
            mobile: mobile,
            linkedin: linkedin,
            github: github,
            resume,
            educationFrom: educationFrom,
            collegeName: collegeName,
            collegeStartDate: collegeStartDate,
            collegeEndDate: collegeEndDate,
            projectName: projectName,
            projectDescription: projectDescription,
            projectType: projectType,
            projectLink: projectLink,
            experienceType: experienceType,
            companyName: companyName,
            companyWebsiteLink: companyWebsiteLink,
            role: role,
            joiningDate: joiningDate,
            leavingDate: leavingDate,
            coverLetter,
            coins: coins,
          },
        }
      )
      res.status(200).json({ responseMsg: "Profile updated successfully", userProfile });
    } else {
      const userProfile = await UserProfile.create({
        avatar,
        name,
        mobile,
        linkedin,
        github,
        resume,
        educationFrom,
        collegeName,
        collegeStartDate,
        collegeEndDate,
        projectName,
        projectDescription,
        projectType,
        projectLink,
        experienceType,
        companyName,
        companyWebsiteLink,
        role,
        joiningDate,
        leavingDate,
        coverLetter,
        userEmailId,
        coins,
      });
      res.status(200).json({ responseMsg: "Profile created successfully", userProfile });
    }

  } catch (err) {
    res.status(500).json({ responseMsg: "Error while creating profile" });
  }
};

// Get All User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.find();
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ responseMsg: "Error while accessing user profile" });
  }
};

// Applied Internships
exports.createInternship = async (req, res) => {
  try {
    const {
      internshipId,
      companyLogo,
      roleName,
      companyName,
      stipend,
      experienceRequired,
      userEmailId,
      coinsSpent,
    } = req.body;

    const existingApplication = await ApplyInternship.findOne({internshipId : internshipId});
    
    if (existingApplication && existingApplication.userEmailId === userEmailId) {
      res.status(200).json({ responseMsg: "You have already applied for this internship"});
    } else {
      const internshipInfo = await ApplyInternship.create({
        internshipId,
        companyLogo,
        roleName,
        companyName,
        stipend,
        experienceRequired,
        userEmailId,
        coinsSpent,
      });
  
      res.status(200).json({ responseMsg: "Internship applied successfully" });
    }

  } catch (error) {
    res.status(500).json({ responseMsg: "Error while applying internship" });
  }
};


// Get all applied internships list [TODO : check already applied user of internshipId else it will throw error]
// exports.getAppliedInternships = (req, res) => {

//   ApplyInternship.find()
//     .then(internshipInfo => res.status(200).json({ responseMsg: "Received all internships list", internshipInfo }))
//     .catch(err => res.status(500).json({ responseMsg: "Error while getting internships list" }))
// }

exports.getAppliedInternships = async (req, res) => {
  try {
    const internshipInfo = await ApplyInternship.find();
    res.status(200).json({ responseMsg: "Received all internships list", internshipInfo });
  } catch (err) {
    res.status(500).json({ responseMsg: "Error while getting internships list" });
  }
}

// Read PDF File
exports.readPdfFile = (req, res) => {

  const fileName = req.params.fileName;

  res.sendFile(fileName, { root: "./files" }, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    } else {
      console.log("File sent successfully");
      res.status(200).send("File fetched successfully");
      // res.status(200).json(fileName);
    }
  });
}