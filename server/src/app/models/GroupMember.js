const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupMemberSchema = new Schema(
    {
        group_id: {
            type: Schema.Types.ObjectId,
            ref: "Group",
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

GroupMemberSchema.pre("save", async function (next) {
    try {
        // If no user role is specified, set a default role
        if (this.isNew && !this.user.user_role) {
            const defaultRole = await mongoose.model("Role").findOne({ role_name: "group_member" });
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

module.exports = mongoose.model("GroupMember", GroupMemberSchema);