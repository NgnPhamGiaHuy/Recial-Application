const jwt = require("jsonwebtoken");

const { connectDB } = require("../../config/database");

const PORT = 8080;

let connectedClients = 0;

const startServer = async (app, server, wss) => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });

        wss.on("connection", (ws, req) => {
            connectedClients++;
            console.log(`Client connected. Total clients: ${connectedClients}`);

            const urlParams = new URLSearchParams(req.url);

            const token = urlParams.get("/?token");
            const conversation = urlParams.get("conversation");

            try {
                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

                if (!decodedToken) {
                    return ws.terminate();
                }

                if (conversation) {
                    ws.conversationId = conversation;
                }

                ws.userId = decodedToken.user_id;

                ws.on("error", console.error);
                ws.on("message", (message) => {
                    console.log("Received message: ", message);
                });

                ws.on("close", () => {
                    connectedClients--;
                    console.log(`Client disconnected. Total clients: ${connectedClients}`);
                });
            } catch (error) {
                return ws.terminate();
            }
        })
    } catch (error) {
        return console.error("Error starting server: ", error);
    }
};

module.exports = startServer;