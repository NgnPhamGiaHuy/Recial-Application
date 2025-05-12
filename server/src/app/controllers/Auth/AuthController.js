const responseHandler = require("../../../utils/responseHandler");

const otpService = require("../../services/authService/otpService");
const authService = require("../../services/authService/authService");

class AuthController {
    async register(req, res) {
        try {
            const { status, data } = await authService.registerUser(req.body);

            // If the service returns a specific status and data format, use custom handler
            return responseHandler.custom(res, status, data.success, data.message, data.data, data.errorCode);
        } catch (error) {
            console.error("Error in AuthController.register:", error);
            return responseHandler.serverError(res, "Internal Server Error", "INTERNAL_SERVER_ERROR");
        }
    }

    async verifyOTP(req, res) {
        try {
            const response = await otpService.verifyUserOTP(req.body);

            // If the service returns a specific status and data format, use custom handler
            return responseHandler.custom(res, response.status, response.data.success || true,
                response.data.message || "OTP verified successfully",
                response.data.data || response.data,
                response.data.errorCode);
        } catch (error) {
            return responseHandler.serverError(res);
        }
    }

    async login(req, res) {
        try {
            const response = await authService.loginUser(req.body);

            // If the service returns a specific status and data format, use custom handler
            return responseHandler.custom(res, response.status, response.data.success || true,
                response.data.message || "Login successful",
                response.data.data || response.data,
                response.data.errorCode);
        } catch (error) {
            return responseHandler.serverError(res);
        }
    }

    async logout(req, res) {
        try {
            const response = await authService.logoutUser(req.user);

            // If the service returns a specific status and data format, use custom handler
            return responseHandler.custom(res, response.status, response.data.success || true,
                response.data.message || "Logout successful",
                response.data.data || response.data,
                response.data.errorCode);
        } catch (error) {
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new AuthController();