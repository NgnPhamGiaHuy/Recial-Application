const CryptoJS = require("crypto-js");

class EncryptionService {
    constructor() {
        this.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
    }

    /**
     * Encrypt a string using AES encryption.
     * @param {string} data - The plain text to encrypt.
     * @returns {string} - The encrypted string.
     */
    encryptData(data) {
        try {
            return CryptoJS.AES.encrypt(data, this.ENCRYPTION_KEY).toString();
        } catch (error) {
            console.error("Encryption error:", error.message);
            throw new Error("Failed to encrypt data.");
        }
    }

    /**
     * Decrypt an AES-encrypted string.
     * @param {string} encryptedData - The encrypted string to decrypt.
     * @returns {string} - The decrypted plain text.
     */
    decryptData(encryptedData) {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, this.ENCRYPTION_KEY);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                throw new Error("Decryption failed - possibly corrupted data or key mismatch.");
            }

            return decrypted;
        } catch (error) {
            console.error("Decryption error:", error.message);
            throw new Error("Failed to decrypt data.");
        }
    }
}

module.exports = new EncryptionService();