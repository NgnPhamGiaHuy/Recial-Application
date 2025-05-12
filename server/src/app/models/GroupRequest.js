const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupRequestSchema = new Schema(
    {
        group_id: {
            type: Schema.Types.ObjectId,
            ref: "Group",
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
)

module.exports = mongoose.model("GroupRequest", GroupRequestSchema);