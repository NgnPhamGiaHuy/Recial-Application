const CryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const Setting = require("../../models/Setting");
const generateToken = require("../../services/tokenService/generateToken");

class AuthController {
    decryptData = (encryptedData) => {
        try {
            const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

            const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                throw new Error("Decryption failed - data may be corrupted or key mismatched.");
            }

            return decrypted;
        } catch (error) {
            console.error("Decryption error:", error.message);
            throw error;
        }
    };
    
    registerUser = async (req, res) => {
        try {
            const session_key = this.decryptData(req.body.session_key);
            const session_password = this.decryptData(req.body.session_password);
            const session_firstname = this.decryptData(req.body.session_firstname);
            const session_lastname = this.decryptData(req.body.session_lastname);

            if (!session_key || !session_password || !session_firstname || !session_lastname) {
                return res.status(400).json({ message: "All fields are required for registration." });
            }

            const existingUser = await User.findOne({ email: session_key });

            if (existingUser) {
                return res.status(409).json({ message: "This email already exists, please try again!" });
            }

            const newUser = new User({
                email: session_key,
                password: session_password,
                firstname: session_firstname,
                lastname: session_lastname,
            })
            await newUser.save();

            const newUserSetting = new Setting({
                source_id: newUser._id,
            });

            await newUserSetting.save();

            return res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.error("Error in registerUser: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    loginUser = async (req, res) => {
        try {
            const session_key = this.decryptData(req.body.session_key);
            const session_password = this.decryptData(req.body.session_password);
            
            // if (!session_key || !session_password) {
            //     return res.status(400).json({ message: "Email and password are required for login." });
            // }

            if (!session_key) {
                return res.status(400).json({ message: "Email and password are required for login." });
            }

            const user = await User.findOne({ email: session_key });

            if (!user) {
                return res.status(404).json({ message: "Sorry, that email isn't registered with us. Please try another." });
            }

            if (!user.isOAuthUser) {
                const isPasswordValid = await bcrypt.compare(session_password, user.password);

                if (!isPasswordValid) {
                    return res.status(401).json({ message: "Invalid password. Please check and try again." });
                }
            }

            const accessToken = await generateToken.generateAccessTokenData(user);
            const refreshToken = await generateToken.generateRefreshTokenData(user);

            user.refreshToken = refreshToken;
            user.updatedAt = Date.now();

            await user.save();

            return res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken });
        } catch (error) {
            console.error("Error in loginUser: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    logoutUser = async (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "User not authenticated" });
            }

            const user = req.user;

            user.refreshToken = null;

            await user.save();

            return res.status(200).json({ message: "Logout" });
        } catch (error) {
            console.error("Error in logoutUser: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

module.exports = new AuthController();