const mongoose = require("mongoose")

const UserProfileSchema = new mongoose.Schema({
    
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    linkedin: {
        type: String,
    },
    github: {
        type: String,
    },
    resume: {
        type: String,
    },
    educationFrom: {
        type: String,
    },
    collegeName: {
        type: String,
    },
    collegeStartDate: {
        type: String,
    },
    collegeEndDate: {
        type: String,
    },
    projectName: {
        type: String,
    },
    projectDescription: {
        type: String,
    },
    projectType: {
        type: String,
    },
    projectLink: {
        type: String,
    },
    experienceType: {
        type: String,
    },
    companyName: {
        type: String,
    },
    companyWebsiteLink: {
        type: String,
    },
    role: {
        type: String,
    },
    joiningDate: {
        type: String,
    },
    leavingDate: {
        type: String,
    },
    coverLetter: {
        type: String,
    },
    userEmailId: {
        type: String,
    },
    coins: {
        type: Number
    },

});

const UserProfile = mongoose.model("user-profile", UserProfileSchema);

module.exports = UserProfile;