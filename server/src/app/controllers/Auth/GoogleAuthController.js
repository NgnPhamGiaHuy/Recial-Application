const { OAuth2Client } = require("google-auth-library");

const User = require("../../models/User");
const Setting = require("../../models/Setting");

const generateToken = require("../../services/tokenService/generateToken");

class GoogleAuthController {
    handleGoogleSignIn = async (req, res) => {
        try {
            const googleToken = req.headers.authorization;

            if (!googleToken) {
                return res.status(401).json({ error: "Google token missing" });
            }

            const token = googleToken.split(' ')[1];

            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: token,
            })

            const { payload } = ticket;

            const user = payload;

            const existingUser = await User.findOne({ email: user.email });

            if (existingUser) {
                const accessToken = await generateToken.generateAccessTokenData(existingUser);
                const refreshToken = await generateToken.generateRefreshTokenData(existingUser);

                existingUser.refreshToken = refreshToken;

                await existingUser.save();

                return res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken });
            }

            const newUser = new User({
                email: user.email,
                isOAuthUser: true,
                username: user.name,
                firstname: user.family_name,
                lastname: user.given_name,
                profile_picture_url: user.picture,
            });

            const accessToken = await generateToken.generateAccessTokenData(newUser);
            const refreshToken = await generateToken.generateRefreshTokenData(newUser);

            newUser.refreshToken = refreshToken;

            await newUser.save();

            const newUserSetting = new Setting({
                source_id: newUser._id,
            });

            await newUserSetting.save();

            return res.status(201).json({ accessToken, refreshToken });
        } catch (error) {
            console.error("Error in handleGoogleSignIn: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

module.exports = new GoogleAuthController();