const profileProperties = {
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    date_of_birth: {
        type: Date,
    },
    profile_picture_url: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/recial-86c5e.appspot.com/o/Default.png?alt=media&token=2ad7f13a-3953-4414-9b87-8a669c8983a1",
    },
    profile_cover_photo_url: {
        type: String,
    },
};

module.exports = profileProperties;