const fs = require("node:fs");
const axios = require("axios");

const Video = require("../../models/Video");
const VideoSaved = require("../../models/VideoSaved");

class GetVideoDataService {
    getHeaders = (start, end, fileSize, chunkSize) => {
        return {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4"
        };
    }

    getRangeParams = (range, fileSize) => {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = (end - start) + 1;
        return { start, end, chunkSize };
    }

    handleLocalVideo = (videoUrl, range) => {
        try {
            const videoStat = fs.statSync(videoUrl);
            const fileSize = videoStat.size;

            if (range) {
                const { start, end, chunkSize } = this.getRangeParams(range, fileSize);
                const stream = fs.createReadStream(videoUrl, { start, end });
                const headers = this.getHeaders(start, end, fileSize, chunkSize);
                return { statusCode: 206, headers, stream };
            } else {
                const headers = {
                    "Content-Length": fileSize,
                    "Content-Type": "video/mp4"
                };
                const stream = fs.createReadStream(videoUrl);
                return { statusCode: 200, headers, stream };
            }
        } catch (error) {
            console.error("Error in handleLocalVideo: ", error);
            throw new Error("Failed to handle local video.");
        }
    }

    handleFirebaseVideo = async (videoUrl) => {
        try {
            const firebaseResponse = await axios.get(videoUrl, { responseType: 'stream' });
            const headers = {
                "Content-Type": "video/mp4"
            };
            return { statusCode: 200, headers, stream: firebaseResponse.data };
        } catch (error) {
            console.error("Error in handleFirebaseVideo: ", error);
            throw new Error("Failed to handle Firebase video.");
        }
    }

    getVideoData = async (videoId, range) => {
        try {
            if (!videoId) {
                throw new Error("Video ID not found");
            }

            const videoData = await Video.findById(videoId);
            if (!videoData) {
                throw new Error("Video not found");
            }

            const videoUrl = videoData.video_url;

            if (videoUrl.startsWith('/')) {
                return this.handleLocalVideo(videoUrl, range);
            } else {
                return this.handleFirebaseVideo(videoUrl);
            }
        } catch (error) {
            console.error("Error in getVideoData: ", error);
            throw new Error("Failed to get video data.");
        }
    }

    getSavedVideoData = async (videoId) => {
        try {
             const videoSavedData = await VideoSaved.find({ video_id: videoId });

             if (!videoSavedData) {
                 throw new Error("Video not found");
             }

             const formattedVideoSavedData = videoSavedData.map((video) => video.user_id);

             return formattedVideoSavedData;
        } catch (error) {
            console.error("Error in getSavedVideoData: ", error);
            throw new Error("Failed to get saved video data");
        }
    }

    getFormattedVideoDataById = async (videoId) => {
        try {
            const videoData = await Video.findById(videoId);

            const formattedVideoData = {
                _id: videoData._id,
                media_type: "Video",
                media_url: videoData.video_url,
                media_title: videoData.video_title,
                media_privacy: videoData.video_privacy,
                media_thumbnail: videoData.video_thumbnail,
                media_resolution: videoData.video_resolution,
                media_description: videoData.video_description,
                created_at: videoData.createdAt,
                updated_at: videoData.updatedAt,
            }

            return formattedVideoData;
        } catch (error) {
            console.error("Error in getFormattedVideoDataById: ", error);
            throw new Error("Failed to get video data.");
        }
    }
}

module.exports = new GetVideoDataService();