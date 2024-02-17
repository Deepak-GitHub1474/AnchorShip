const jwt = require("jsonwebtoken");

// Register Validation
exports.sendOtpValidation = (req, res, next) => {
    const {email} = req.body;

    if (email) {
        next()
    } else {
        res.status(404).send({ responseMsg: "Email is required" });
    }
}

// OTP Validation
exports.otpValidation = (req, res, next) => {
    const { userOtp } = req.body;

    if (userOtp) {
        next()
    } else {
        res.status(404).send({ responseMsg: "OTP is required" });
    }
}

// User Validation
exports.verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(404).json("Token is missing")
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(404).json("Token is wrong")
            } else {
                req.email = decoded.email;
                next()
            }
        })
    }
};
