const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventMemberSchema = new Schema(
    {
        event_id: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        user: {
            user_id: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            user_role: {
                type: Schema.Types.ObjectId,
                ref: "Role",
                required: true,
            },
        },
    }, {
    timestamps: true,
}
);

EventMemberSchema.pre("save", async function (next) {
    try {
        // If no user role is specified, set a default role
        if (this.isNew && !this.user.user_role) {
            const defaultRole = await mongoose.model("Role").findOne({ role_name: "event_member" });
            if (defaultRole) {
                this.user.user_role = defaultRole._id;
            }
        }
        next();
    } catch (error) {
        console.error('Error while setting default role:', error);
        next(error);
    }
});

module.exports = mongoose.model("EventMember", EventMemberSchema);