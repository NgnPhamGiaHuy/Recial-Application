const fs = require("fs").promises;
const admin = require("firebase-admin");
const path = require("path");

const Video = require("../../models/Video");
const responseHandler = require("../../../utils/responseHandler");

const serviceAccount = require("../../../config/firebase/secrets/recial-86c5e-firebase-adminsdk-wli0y-0d866033b0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "recial-86c5e.appspot.com",
});

const bucket = admin.storage().bucket();

class VideoDownloadController {
    async downloadVideoAndUpdateURL(req, res) {
        try {
            const videoTrackList = await Video.find({ video_url: /firebasestorage\.googleapis\.com/ });
            console.log("Starting video download process. Number of videos to process:", videoTrackList.length);

            const videoDir = path.resolve(__dirname, "../../../assets");
            await fs.mkdir(videoDir, { recursive: true });

            const downloadPromises = videoTrackList.map(video => this.downloadAndUpdateVideo(video, videoDir));

            await Promise.all(downloadPromises);

            const message = "Video URLs updated successfully";
            if (res) {
                return responseHandler.ok(res, { count: videoTrackList.length }, message);
            } else {
                console.log(message);
            }
        } catch (error) {
            console.error("Error in downloadVideoAndUpdateURL: ", error);
            if (res) {
                return responseHandler.serverError(res, "Failed to download and update video URLs");
            }
        }
    }

    async downloadAndUpdateVideo(video, videoDir) {
        try {
            const matches = video.video_url.match(/\/([^\/?#]+?)%2Fvideos%2F([^\/?#]+?)\.mp4/);

            if (!matches || matches.length < 3) {
                throw new Error(`Invalid video URL format for video ${video._id}`);
            }

            const userId = matches[1];
            const videoName = matches[2];
            const userVideoDir = path.join(videoDir, "user", userId);

            await fs.mkdir(userVideoDir, { recursive: true });

            const videoPath = path.join(userVideoDir, `${videoName}.mp4`);

            await bucket.file(`${userId}/videos/${videoName}.mp4`).download({ destination: videoPath });

            video.video_url = videoPath;
            await video.save();

            await bucket.file(`${userId}/videos/${videoName}.mp4`).delete();
            console.log(`Video ${video._id} deleted from Firebase Storage`);

            console.log(`Video ${video._id} downloaded and saved locally at ${videoPath}`);
        } catch (error) {
            console.error(`Failed to download video ${video._id}:`, error);
        }
    }
}

module.exports = new VideoDownloadController();
