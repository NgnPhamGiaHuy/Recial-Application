const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class FriendRequestGenerator extends BaseGenerator {
    constructor() {
        super('FriendRequest');
    }

    async generateOne() {
        // Get all users
        const userModel = mongoose.model('User');
        const userCount = await userModel.countDocuments();

        if (userCount < 2) {
            throw new Error('Not enough users to generate friend requests. Need at least 2 users.');
        }

        // Keep track of processed pairs to avoid duplicates
        const processedPairs = new Set();

        // Keep trying until we find a unique user pair
        let sourceUser = null;
        let destinationUser = null;
        let pairKey = '';
        let attempts = 0;
        const maxAttempts = 20; // Increased max attempts

        while (attempts < maxAttempts) {
            // Get two random users
            const randomSkip1 = Math.floor(Math.random() * userCount);
            const randomSkip2 = Math.floor(Math.random() * userCount);

            sourceUser = await userModel.findOne().skip(randomSkip1);
            destinationUser = await userModel.findOne().skip(randomSkip2);

            // Make sure we don't have the same user for both source and destination
            if (sourceUser && destinationUser && !sourceUser._id.equals(destinationUser._id)) {
                // Create a unique key for this pair (always use smaller ID first for consistency)
                const ids = [sourceUser._id.toString(), destinationUser._id.toString()].sort();
                pairKey = ids.join('-');

                // Check if we've already processed this pair
                if (!processedPairs.has(pairKey)) {
                    processedPairs.add(pairKey);

                    // Check if a friend request already exists between these users
                    const existingRequest = await this.model.findOne({
                        $or: [
                            { source_id: sourceUser._id, destination_id: destinationUser._id },
                            { source_id: destinationUser._id, destination_id: sourceUser._id }
                        ]
                    });

                    // Also check if they're already friends
                    const areAlreadyFriends = await userModel.findOne({
                        _id: sourceUser._id,
                        friends: { $in: [destinationUser._id] }
                    });

                    // If no existing request and not already friends, we can create one
                    if (!existingRequest && !areAlreadyFriends) {
                        break;
                    }
                }
            }

            attempts++;
        }

        if (attempts >= maxAttempts) {
            console.log('Could not find a unique user pair for friend request after multiple attempts. Skipping.');
            return null; // Return null instead of throwing error
        }

        // Build friend request data
        const friendRequestData = {
            source_id: sourceUser._id,
            destination_id: destinationUser._id
        };

        return await this.saveDocument(friendRequestData);
    }
}

const generateFriendRequests = async (count = 50) => {
    // Reduce the count if it exceeds the possible unique pairs
    const userModel = mongoose.model('User');
    const userCount = await userModel.countDocuments();
    const maxPossibleRequests = (userCount * (userCount - 1)) / 2;
    const adjustedCount = Math.min(count, maxPossibleRequests);

    if (adjustedCount < count) {
        console.log(`⚠️ Reduced friend request count from ${count} to ${adjustedCount} (maximum possible unique pairs)`);
    }

    const generator = new FriendRequestGenerator();
    return await generator.generate(adjustedCount);
};

module.exports = {
    generateFriendRequests,
    FriendRequestGenerator
}; 