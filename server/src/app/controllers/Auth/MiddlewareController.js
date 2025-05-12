const jwt = require("jsonwebtoken");

const getUserDataService = require("../../services/userService/getUserDataService");
const responseHandler = require("../../../utils/responseHandler");

class MiddlewareController {
    verifyToken = async (req, res, next) => {
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken) {
                return responseHandler.unauthorized(res, "Access token missing");
            }

            const token = accessToken.split(" ")[1];

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const userId = decodedToken.user_id;

            const user = await getUserDataService.getRawUserData(userId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            req.user = user;
            req.userId = user._id;

            return next();
        } catch (error) {
            console.error("Error in verifyToken: ", error);
            return responseHandler.serverError(res);
        }
    };

    setCORPHeader = (policy) => {
        return (req, res, next) => {
            const requestOrigin = req.get("origin");

            if (requestOrigin && (requestOrigin === "http://localhost:3000" || requestOrigin === "http://35.247.175.118/" || requestOrigin === "https://recial-application.as.r.appspot.com/")) {
                res.set("Cross-Origin-Resource-Policy", "same-site");
            } else {
                res.set("Cross-Origin-Resource-Policy", policy);
            }
            next();
        };
    };
}

module.exports = new MiddlewareController();