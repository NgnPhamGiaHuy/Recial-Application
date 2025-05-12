const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const { connectDB, disconnectDB } = require('../../config/database');

// Import all models first
const importAllModels = () => {
    console.log('📂 Importing all models...');
    const modelsDir = path.join(process.cwd(), 'app', 'models');

    // Check if directory exists
    if (!fs.existsSync(modelsDir)) {
        console.error(`❌ Models directory not found: ${modelsDir}`);
        return;
    }

    // Get all JS files from the models directory
    const modelFiles = fs.readdirSync(modelsDir)
        .filter(file => file.endsWith('.js') && file !== '.DS_Store');

    // Import each model file
    for (const file of modelFiles) {
        try {
            require(path.join(modelsDir, file));
            console.log(`   ✓ Imported model: ${file}`);
        } catch (error) {
            console.error(`   ✗ Error importing model ${file}:`, error);
        }
    }

    // Import subdirectories if needed (like User properties)
    const subdirs = fs.readdirSync(modelsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const subdir of subdirs) {
        const subdirPath = path.join(modelsDir, subdir);
        const subdirFiles = fs.readdirSync(subdirPath)
            .filter(file => file.endsWith('.js'));

        for (const file of subdirFiles) {
            try {
                require(path.join(subdirPath, file));
                console.log(`   ✓ Imported model: ${subdir}/${file}`);
            } catch (error) {
                console.error(`   ✗ Error importing model ${subdir}/${file}:`, error);
            }
        }
    }

    console.log('✅ All models imported');
};

// Import all model generators
const generateAllMockData = async (count = 50) => {
    try {
        console.log('🚀 Starting mock data generation...');

        // Connect to the database
        await connectDB();

        // Import all models
        importAllModels();

        // Clear existing data
        await clearAllCollections();

        // Generate mock data in the correct order to respect relationships

        // First generate data for models without dependencies
        await generateUsers(count);
        await generateRoles();
        await generateTypes();
        await generateStatuses();
        await generateTags(count);
        await generateLocations(count);

        // Generate user settings (one per user)
        await generateSettings();

        // Then generate data for models with simpler dependencies
        await generateEvents(count);
        await generateGroups(count);
        await generatePages(count);

        // Generate membership relationships first
        await generateFriendRequests(count);
        await generateUserFriendships(count * 2); // Generate friendships
        await generateUserFollowRelationships(count * 3); // Generate follow relationships
        await generateGroupMembers(count);
        await generatePageMembers(count);

        // Now generate media content after memberships are established
        await generateVideos(count);  // Generate videos first
        await generatePosts(count);   // Then generate posts

        // Generate data that depends on posts and videos
        await generateComments(count * 2);  // Generate more comments to cover both posts and videos
        await generateNotifications(count);
        await generateEventMembers(count);
        await generateReactions(count * 2);  // Generate more reactions to cover both posts and videos

        console.log('✅ Mock data generation completed successfully!');

        // Disconnect from the database
        await disconnectDB();
    } catch (error) {
        console.error('❌ Error generating mock data:', error);
        process.exit(1);
    }
};

const clearAllCollections = async () => {
    console.log('🗑️  Clearing existing collections...');

    const collections = Object.keys(mongoose.connection.collections);

    for (const collectionName of collections) {
        try {
            await mongoose.connection.collections[collectionName].deleteMany({});
            console.log(`   ✓ Collection cleared: ${collectionName}`);
        } catch (error) {
            console.error(`   ✗ Failed to clear collection ${collectionName}:`, error);
        }
    }
};

// Import all individual generators
const { generateUsers } = require('./generators/userGenerator');
const { generateRoles } = require('./generators/roleGenerator');
const { generateTypes } = require('./generators/typeGenerator');
const { generateStatuses } = require('./generators/statusGenerator');
const { generateTags } = require('./generators/tagGenerator');
const { generateLocations } = require('./generators/locationGenerator');
const { generatePosts } = require('./generators/postGenerator');
const { generateComments } = require('./generators/commentGenerator');
const { generateNotifications } = require('./generators/notificationGenerator');
const { generateEvents } = require('./generators/eventGenerator');
const { generateGroups } = require('./generators/groupGenerator');
const { generatePages } = require('./generators/pageGenerator');
const { generateFriendRequests } = require('./generators/friendRequestGenerator');
const { generateUserFriendships, generateUserFollowRelationships } = require('./generators/userRelationshipGenerator');
const { generateGroupMembers } = require('./generators/groupMemberGenerator');
const { generatePageMembers } = require('./generators/pageMemberGenerator');
const { generateEventMembers } = require('./generators/eventMemberGenerator');
const { generateReactions } = require('./generators/reactionGenerator');
const { generateVideos } = require('./generators/videoGenerator');
const { generateSettings } = require('./generators/settingGenerator');

// Check if this file is being executed directly
if (require.main === module) {
    const count = process.argv[2] ? parseInt(process.argv[2]) : 50;
    generateAllMockData(count)
        .then(() => process.exit(0))
        .catch((error) => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = {
    generateAllMockData,
    importAllModels
}; 