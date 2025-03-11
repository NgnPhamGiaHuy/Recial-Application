const authService = require("../../services/authService/authService");
const otpService = require("../../services/authService/otpService");

class AuthController {
    async register(req, res) {
        try {
            const { status, data } = await authService.registerUser(req.body);
            return res.status(status).json(data);
        } catch (error) {
            console.error("Error in AuthController.register:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                errorCode: "INTERNAL_SERVER_ERROR",
            });
        }
    }

    async verifyOTP(req, res) {
        try {
            const response = await otpService.verifyUserOTP(req.body);
            return res.status(response.status).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async login(req, res) {
        try {
            const response = await authService.loginUser(req.body);
            return res.status(response.status).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async logout(req, res) {
        try {
            const response = await authService.logoutUser(req.user);
            return res.status(response.status).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new AuthController();