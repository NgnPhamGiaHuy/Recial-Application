const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoShareSchema = new Schema(
    {
        video_id: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }, {
        timestamps: true,
    },
);

module.exports = mongoose.model("VideoShare", VideoShareSchema);