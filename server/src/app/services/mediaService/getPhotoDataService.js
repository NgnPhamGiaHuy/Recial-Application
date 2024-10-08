const Photo = require("../../models/Photo");
const PhotoSaved = require("../../models/PhotoSaved");

class GetPhotoDataService {
    getRawPhotoData = async (photoId) => {
        try {
            const photoData = await Photo.findById(photoId);

            return photoData;
        } catch (error) {
            console.error("Error in getRawPhotoData: ", error);
            throw new Error("Failed to fetch raw photo data");
        }
    }

    getFormattedPhotoDataById = async (photoId) => {
        try {
            const photoData = await this.getRawPhotoData(photoId);

            return {
                _id: photoData._id,
                media_type: "Photo",
                media_url: photoData.photo_url,
                media_title: photoData.photo_title,
                media_description: photoData.photo_description,
                created_at: photoData.createdAt,
                updated_at: photoData.updatedAt,
            }
        } catch (error) {
            console.error("Error in getFormattedPhotoDataById: ", error);
            throw new Error("Failed to fetch photo data");
        }
    }

    getFormattedPhotoSavedDataAndReturnUserId = async (photoId) => {
        try {
            const photoSavedData = await PhotoSaved.find({ photo_id: photoId });

            const formattedPhotoSavedData = photoSavedData.map(photoSaved => photoSaved.user_id.toString());

            return formattedPhotoSavedData;
        } catch (error) {
            console.error("Error in getFormattedPhotoSavedDataAndReturnUserId: ", error);
            throw new Error("Failed to fetch photo saved data");
        }
    }
}

module.exports = new GetPhotoDataService();