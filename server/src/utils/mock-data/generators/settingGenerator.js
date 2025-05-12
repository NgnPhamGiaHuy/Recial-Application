const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class SettingGenerator extends BaseGenerator {
    constructor() {
        super('Setting');
    }

    async generateOne() {
        // Find a user without settings
        const userModel = mongoose.model('User');
        const settingModel = mongoose.model('Setting');

        // Find all users that don't yet have settings
        const usersWithoutSettings = await userModel.find({
            _id: {
                $nin: await settingModel.distinct('source_id')
            }
        }).select('_id');

        if (usersWithoutSettings.length === 0) {
            console.log('All users already have settings. Skipping.');
            return null;
        }

        // Select a random user without settings
        const user = faker.helpers.arrayElement(usersWithoutSettings);

        // Generate random settings for this user
        const settingData = {
            source_id: user._id,

            // Privacy settings
            privacy: {
                friend_request: faker.helpers.arrayElement(['Everyone', 'Friends_of_friends', 'None']),
                post_visibility: faker.helpers.arrayElement(['Public', 'Private', 'Friends', 'Specific_Friends']),
                profile_privacy: faker.helpers.arrayElement(['Public', 'Private', 'Friends', 'Specific_Friends']),
                mute_list: [],
                block_list: []
            },

            // Account settings
            account: {
                language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'ar']),
                timezone: faker.location.timeZone(),
                zip_code: faker.location.zipCode('#####'), // Numeric zip code
                security: {
                    two_factor_auth: faker.datatype.boolean({ probability: 0.2 }),
                    login_alerts: faker.datatype.boolean({ probability: 0.4 })
                }
            },

            // Content settings
            content: {
                auto_play_video: faker.datatype.boolean({ probability: 0.7 })
            },

            // Appearance settings
            appearance: {
                theme: faker.helpers.arrayElement(['Light', 'Dark']),
                font: faker.helpers.arrayElement(['Default', 'Sans-serif', 'Serif', 'Monospace', 'Comic Sans MS'])
            }
        };

        // Randomly add some users to mute or block lists (10% probability)
        if (faker.datatype.boolean({ probability: 0.1 })) {
            // Get 1-3 random users to mute, different from current user
            const mutedUsers = await this.getRandomUsers(1, 3, user._id);
            settingData.privacy.mute_list = mutedUsers;
        }

        if (faker.datatype.boolean({ probability: 0.1 })) {
            // Get 1-2 random users to block, different from current user and muted users
            const blockedUsers = await this.getRandomUsers(1, 2, user._id, settingData.privacy.mute_list);
            settingData.privacy.block_list = blockedUsers;
        }

        return await this.saveDocument(settingData);
    }

    // Helper method to get random users while excluding certain IDs
    async getRandomUsers(minCount, maxCount, ...excludeIds) {
        const userModel = mongoose.model('User');

        // Flatten and convert all excluded IDs to strings for comparison
        const excludedIdStrings = excludeIds
            .flat()
            .filter(id => id) // Filter out null/undefined
            .map(id => id.toString());

        // Get all users except excluded ones
        const allUsers = await userModel.find({
            _id: { $nin: excludedIdStrings }
        }).select('_id');

        if (allUsers.length === 0) return [];

        // Determine how many users to select (between min and max)
        const count = faker.number.int({ min: minCount, max: Math.min(maxCount, allUsers.length) });

        // Shuffle and pick the first 'count' users
        const shuffled = [...allUsers].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count).map(user => user._id);
    }
}

/**
 * Generate settings for all users who don't have settings yet
 */
const generateSettings = async () => {
    const userModel = mongoose.model('User');
    const settingModel = mongoose.model('Setting');

    // Count users without settings
    const userCount = await userModel.countDocuments();
    const settingsCount = await settingModel.countDocuments();
    const remainingCount = userCount - settingsCount;

    if (remainingCount <= 0) {
        console.log('✅ All users already have settings.');
        return [];
    }

    console.log(`📝 Generating settings for ${remainingCount} users without settings...`);

    const generator = new SettingGenerator();
    return await generator.generate(remainingCount);
};

module.exports = {
    generateSettings,
    SettingGenerator
}; 