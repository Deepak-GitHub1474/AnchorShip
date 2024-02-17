const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        default: "username",
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dlt4ash36/image/upload/v1706377919/avatar_angxlv.png",
    },

    coins: {
        type: Number
    },

});

const User = mongoose.model("user", UserSchema);

module.exports = User;