const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authProperties = require("./User/authProperties");
const userProperties = require("./User/userProperties");
const profileProperties = require("./User/profileProperties");
const socialProperties = require("./User/socialProperties");
const contactProperties = require("./User/contactProperties");
const mediaProperties = require("./User/mediaProperties");
const permissionsProperties = require("./User/permissionsProperties");

const UserSchema = new Schema(
    {
        ...userProperties,
        ...profileProperties,
        ...socialProperties,
        ...contactProperties,
        ...mediaProperties,
        ...permissionsProperties,
        ...authProperties,
    }, {
    timestamps: true,
},
);

UserSchema.pre("save", async function (next) {
    try {
        // Set default role if needed
        if (this.isNew && !this.role) {
            const defaultRole = await mongoose.model("Role").findOne({ role_name: "User" });
            if (defaultRole) {
                this.role = defaultRole._id;
            }
        }

        // Clear password for OAuth users
        if (this.isOAuthUser) {
            this.password = '';
        }

        // Call next() only once after all operations
        next();
    } catch (error) {
        console.error('Error in User pre-save hook:', error);
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);