const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class UserRelationshipGenerator extends BaseGenerator {
    constructor() {
        super('User');
    }

    // Helper method to check if two users are already connected
    async areUsersConnected(userId1, userId2, connectionType) {
        const user1 = await this.model.findById(userId1);
        if (!user1) return true; // Consider connected to avoid errors

        if (connectionType === 'friends') {
            return user1.friends.includes(userId2);
        } else if (connectionType === 'following') {
            return user1.following.includes(userId2);
        }
        return false;
    }

    // Generate friend connections
    async generateFriendships(count) {
        console.log(`📝 Generating ${count} user friendships...`);
        const friendships = [];
        const processedPairs = new Set();

        // Get user count
        const userCount = await this.model.countDocuments();
        if (userCount < 2) {
            throw new Error('Not enough users to generate friendships. Need at least 2 users.');
        }

        // Calculate max possible friendships
        const maxPossibleFriendships = (userCount * (userCount - 1)) / 2;
        const adjustedCount = Math.min(count, maxPossibleFriendships);

        if (adjustedCount < count) {
            console.log(`⚠️ Reduced friendship count from ${count} to ${adjustedCount} (maximum possible unique pairs)`);
        }

        // Generate friendships
        for (let i = 0; i < adjustedCount; i++) {
            let attempts = 0;
            const maxAttempts = 10;

            while (attempts < maxAttempts) {
                // Get two random users
                const randomSkip1 = Math.floor(Math.random() * userCount);
                const randomSkip2 = Math.floor(Math.random() * userCount);

                const user1 = await this.model.findOne().skip(randomSkip1);
                const user2 = await this.model.findOne().skip(randomSkip2);

                // Make sure we don't have the same user for both
                if (user1 && user2 && !user1._id.equals(user2._id)) {
                    // Create a unique key for this pair (always use smaller ID first for consistency)
                    const ids = [user1._id.toString(), user2._id.toString()].sort();
                    const pairKey = ids.join('-');

                    // Check if we've already processed this pair
                    if (!processedPairs.has(pairKey) &&
                        !(await this.areUsersConnected(user1._id, user2._id, 'friends'))) {
                        processedPairs.add(pairKey);

                        // Add each user to the other's friends list
                        await this.model.updateOne(
                            { _id: user1._id },
                            { $addToSet: { friends: user2._id } }
                        );

                        await this.model.updateOne(
                            { _id: user2._id },
                            { $addToSet: { friends: user1._id } }
                        );

                        console.log(`➕ Created friendship between ${user1.username} and ${user2.username}`);
                        friendships.push({ user1: user1._id, user2: user2._id });
                        break;
                    }
                }
                attempts++;
            }

            if (attempts >= maxAttempts) {
                console.error(`Failed to find unique user pair for friendship after ${maxAttempts} attempts`);
            }
        }

        console.log(`✅ Generated ${friendships.length} user friendships`);
        return friendships;
    }

    // Generate follower/following relationships
    async generateFollowRelationships(count) {
        console.log(`📝 Generating ${count} user follow relationships...`);
        const followRelationships = [];

        // Get user count
        const userCount = await this.model.countDocuments();
        if (userCount < 2) {
            throw new Error('Not enough users to generate follow relationships. Need at least 2 users.');
        }

        // Generate follow relationships
        for (let i = 0; i < count; i++) {
            let attempts = 0;
            const maxAttempts = 10;

            while (attempts < maxAttempts) {
                // Get two random users
                const randomSkip1 = Math.floor(Math.random() * userCount);
                const randomSkip2 = Math.floor(Math.random() * userCount);

                const follower = await this.model.findOne().skip(randomSkip1);
                const followed = await this.model.findOne().skip(randomSkip2);

                // Make sure we don't have the same user for both
                if (follower && followed && !follower._id.equals(followed._id)) {
                    // Check if this follow relationship already exists
                    if (!(await this.areUsersConnected(follower._id, followed._id, 'following'))) {
                        // Add followed to follower's following list
                        await this.model.updateOne(
                            { _id: follower._id },
                            { $addToSet: { following: followed._id } }
                        );

                        // Add follower to followed's followers list
                        await this.model.updateOne(
                            { _id: followed._id },
                            { $addToSet: { followers: follower._id } }
                        );

                        console.log(`➕ Created follow relationship: ${follower.username} follows ${followed.username}`);
                        followRelationships.push({ follower: follower._id, followed: followed._id });
                        break;
                    }
                }
                attempts++;
            }

            if (attempts >= maxAttempts) {
                console.error(`Failed to create unique follow relationship after ${maxAttempts} attempts`);
            }
        }

        console.log(`✅ Generated ${followRelationships.length} user follow relationships`);
        return followRelationships;
    }

    // Required implementation of BaseGenerator method, but we'll not use it directly
    async generateOne() {
        throw new Error('Use generateFriendships or generateFollowRelationships instead');
    }
}

// Create wrapper functions for the generator
const generateUserFriendships = async (count = 200) => {
    const generator = new UserRelationshipGenerator();
    return await generator.generateFriendships(count);
};

const generateUserFollowRelationships = async (count = 300) => {
    const generator = new UserRelationshipGenerator();
    return await generator.generateFollowRelationships(count);
};

module.exports = {
    generateUserFriendships,
    generateUserFollowRelationships,
    UserRelationshipGenerator
}; 