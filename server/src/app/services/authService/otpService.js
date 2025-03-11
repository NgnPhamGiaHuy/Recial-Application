const User = require("../../models/User");

class OTPService {
    /**
     * Generate a random 6-digit OTP code.
     * @returns {string} - A 6-digit OTP.
     */
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    /**
     * Validate if the OTP is still valid based on expiry time.
     * @param {Date} otpExpiresAt - Expiry time of the OTP.
     * @returns {boolean} - True if OTP is valid, false otherwise.
     */
    isOTPValid(otpExpiresAt) {
        return Date.now() <= otpExpiresAt;
    }

    verifyUserOTP = async (data) => {
        const { email, otp } = data;
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
            return { status: 400, data: { message: "Invalid or expired OTP." } };
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        return { status: 200, data: { message: "OTP verified successfully." } };
    }
}

module.exports = new OTPService();