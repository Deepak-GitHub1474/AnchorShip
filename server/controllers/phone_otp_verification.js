const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send OTP
exports.sendPhoneOTP = (req, res) => {
    const { phoneNumber } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000);

    client.messages
        .create({
            body: `Your OTP is: ${otp}`,
            from: process.env.MY_TWILIO_NUMBER,
            to: phoneNumber
        })
        .then(() => {
            res.status(200).json({ success: true, otp, responseMsg: 'OTP sent' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, responseMsg: 'Failed to send OTP' });
        });
}

// Verify OTP
exports.verifyPhoneOTP = (req, res) => {
    const { otp, userOtp } = req.body;

    if (otp === parseInt(userOtp)) {
        res.json({ success: true, responseMsg: 'OTP verified' });
    } else {
        res.status(400).json({ success: false, responseMsg: 'Invalid OTP' });
    }
}


