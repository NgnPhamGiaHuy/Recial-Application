const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        post_title: {
            type: String,
        },
        post_content: {
            type: String,
        },
        post_privacy: {
            type: String,
            required: true,
            default: "Public",
            enum: ["Public", "Private", "Friends", "Specific_Friends"],
        },
        post_views: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            viewed_at: {
                type: Date,
                default: null,
            },
        }],
        post_shares: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            shared_at: {
                type: Date,
                default: null,
            },
        }],
        post_tags: [{
            type: Schema.Types.ObjectId,
            ref: "Tag",
        }],
        post_photos: [{
            type: Schema.Types.ObjectId,
            ref: "Photo",
        }],
        post_location: {
            type: Schema.Types.ObjectId,
            ref: "Location",
        },
    }, {
        timestamps: true,
    },
);

module.exports = mongoose.model("Post", PostSchema);