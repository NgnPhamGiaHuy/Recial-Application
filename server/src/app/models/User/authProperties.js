const authProperties = {
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    }
}

module.exports = authProperties;