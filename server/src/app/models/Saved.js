const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavedSchema = new Schema(
    {
        source_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        destination: {
            type: {
                type: Schema.Types.ObjectId,
                ref: "Type",
                required: true,
            },
            destination_id: {
                type: Schema.Types.ObjectId,
                required: true,
            },
        },
    }, {
        timestamps: true,
    },
);

module.exports = mongoose.model("Saved", SavedSchema);