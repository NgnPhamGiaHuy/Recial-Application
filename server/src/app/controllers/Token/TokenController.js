const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const generateToken = require("../../services/tokenService/generateToken");
const responseHandler = require("../../../utils/responseHandler");

class TokenController {
    requestRefreshToken = async (req, res) => {
        try {
            const refreshToken = req.headers.authorization;

            if (!refreshToken) {
                return responseHandler.unauthorized(res, "You're not authenticated");
            }

            const token = refreshToken.split(' ')[1];

            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (error, decoded) => {
                if (error) {
                    return responseHandler.forbidden(res, "Refresh token is not valid");
                }

                const user = await User.findById(decoded.userId);

                if (!user) {
                    return responseHandler.notFound(res, "User not found");
                }

                const newAccessToken = await generateToken.generateAccessTokenData(user);

                return responseHandler.ok(res, { accessToken: newAccessToken }, "Access token refreshed successfully");
            });
        } catch (error) {
            console.error("Error requesting refresh token: ", error);
            return responseHandler.serverError(res);
        }
    };
}

module.exports = new TokenController();