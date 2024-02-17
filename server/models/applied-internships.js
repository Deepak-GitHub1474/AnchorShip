const mongoose = require("mongoose")

const InternshipSchema = new mongoose.Schema({

    internshipId: {
        type: Number,
        unique: true,
    },
    companyLogo: {
        type: String,
    },
    roleName: {
        type: String,
    },
    companyName: {
        type: String,
    },
    stipend: {
        type: String,
    },
    experienceRequired: {
        type: String,
    },
    userEmailId: {
        type: String,
    },
    coinsSpent: {
        type: Number,
    },

});

const ApplyInternship = mongoose.model("applied-internship", InternshipSchema);

module.exports = ApplyInternship;