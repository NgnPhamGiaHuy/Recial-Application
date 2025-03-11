const CryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const Setting = require("../../models/Setting");
const otpService = require("../../services/authService/otpService");
const emailService = require("../../services/emailService/emailService");
const generateToken = require("../../services/tokenService/generateToken");
const encryptionService = require("../../services/cryptoService/encryptionService");

class AuthService {
    decryptData(encryptedData) {
        try {
            const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
            const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);

            if (!decrypted) throw new Error("Decryption failed.");
            return decrypted;
        } catch (error) {
            console.error("Decryption error:", error.message);
            return null;
        }
    };

    async registerUser(data) {
        try {
            const email = encryptionService.decryptData(data.session_key);
            const password = encryptionService.decryptData(data.session_password);
            const firstname = encryptionService.decryptData(data.session_firstname);
            const lastname = encryptionService.decryptData(data.session_lastname);
            
            if (!email || !password || !firstname || !lastname) {
                return {
                    status: 400,
                    data: {
                        success: false,
                        message: "All fields are required.",
                        errorCode: "MISSING_FIELDS",
                    },
                };
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return {
                    status: 409,
                    data: {
                        success: false,
                        message: "Email already exists.",
                        errorCode: "EMAIL_ALREADY_EXISTS",
                    },
                };
            }
            
            const otp = otpService.generateOTP();
            await emailService.sendOTPEmail(email, otp);

            const newUser = new User({
                email,
                password: password,
                firstname,
                lastname,
                isVerified: false,
                otp,
                otpExpiresAt: Date.now() + 5 * 60 * 1000,
            });
            await newUser.save();

            const userSettings = new Setting({ source_id: newUser._id });
            await userSettings.save();

            return {
                status: 201,
                data: {
                    success: true,
                    message: "OTP sent. Verify your email.",
                },
            };
        } catch (error) {
            console.error("Error in AuthService.registerUser:", error);
            return {
                status: 500,
                data: { success: false, message: "Internal Server Error" },
            };
        }
    }

    async loginUser(data) {
        try {
            const email = this.decryptData(data.session_key);
            const password = this.decryptData(data.session_password);

            const user = await User.findOne({ email });
            if (!user) {
                return { status: 404, data: { success: false, message: "Email not registered." } };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return { status: 401, data: { success: false, message: "Invalid password." } };
            }

            const accessToken = await generateToken.generateAccessTokenData(user);
            const refreshToken = await generateToken.generateRefreshTokenData(user);

            user.refreshToken = refreshToken;
            await user.save();

            return { status: 200, data: { success: true, accessToken, refreshToken } };
        } catch (error) {
            console.error("Error in AuthService.loginUser:", error);
            return { status: 500, data: { success: false, message: "Internal Server Error" } };
        }
    }

    async logoutUser(user) {
        try {
            user.refreshToken = null;
            await user.save();
            return { status: 200, data: { success: true, message: "Logged out successfully." } };
        } catch (error) {
            console.error("Error in AuthService.logoutUser:", error);
            return { status: 500, data: { success: false, message: "Internal Server Error" } };
        }
    }
}

module.exports = new AuthService();