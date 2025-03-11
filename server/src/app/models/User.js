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

UserSchema.pre("save", async function(next) {
   if (this.isNew && !this.roles.length) {
       try {
           const defaultRole = await mongoose.model("Role").findOne({ roleName: "User" });

           if (defaultRole) {
               this.roles.push(defaultRole._id);
           }
       } catch (error) {
           console.error('Error while setting default role:', error);
       }
   }

   next();

   if (this.isOAuthUser) {
        this.password = '';
   }

   next();
});

module.exports = mongoose.model('User', UserSchema);