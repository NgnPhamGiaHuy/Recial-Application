const CryptoJS = require("crypto-js");

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

const decrypt = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
            throw new Error("Decryption failed - data may be corrupted or key mismatched.");
        }

        return decrypted;
    } catch (error) {
        console.error("Decryption error:", error.message);
        throw error;
    }
};

module.exports = { encrypt, decrypt };