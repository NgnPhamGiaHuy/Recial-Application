#!/usr/bin/env node
const { generateAllMockData } = require('./index');
const { generateModelGenerators } = require('./generateModelGenerators');
const { connectDB, disconnectDB } = require('../../config/database');
const { generateUserFriendships, generateUserFollowRelationships } = require('./generators/userRelationshipGenerator');
const { generateSettings } = require('./generators/settingGenerator');

// Parse command-line arguments
const args = process.argv.slice(2);

const showHelp = () => {
    console.log(`
Mock Data Generation CLI

Usage:
  node cli.js [command] [options]

Commands:
  generate                Generate mock data for all models (default)
  create-generators       Create generator files for models that don't have them
  generate-user-relationships  Generate friendships and follower/following relationships
  generate-user-settings  Generate settings for all users who don't have them
  help                    Show this help message

Options:
  --count, -c <number>    Number of records to generate (default: 50)
  --model, -m <name>      Generate data only for specified model
  --help, -h              Show help

Examples:
  node cli.js generate -c 100            Generate 100 records for each model
  node cli.js generate -m User -c 50     Generate 50 User records
  node cli.js create-generators          Create generator files for all models
  node cli.js generate-user-relationships -c 200   Generate 200 friendships and 300 follow relationships
  node cli.js generate-user-settings     Generate settings for all users
  `);
};

const parseArgs = () => {
    const options = {
        command: 'generate',
        count: 50,
        model: null
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        // Parse commands
        if (arg === 'generate' || arg === 'create-generators' ||
            arg === 'generate-user-relationships' || arg === 'generate-user-settings' ||
            arg === 'help') {
            options.command = arg;
            continue;
        }

        // Parse options
        switch (arg) {
            case '--count':
            case '-c':
                options.count = parseInt(args[++i], 10) || 50;
                break;
            case '--model':
            case '-m':
                options.model = args[++i];
                break;
            case '--help':
            case '-h':
                options.command = 'help';
                break;
        }
    }

    return options;
};

const run = async () => {
    try {
        const options = parseArgs();

        if (options.command === 'help') {
            showHelp();
            return;
        }

        if (options.command === 'create-generators') {
            await connectDB();
            await generateModelGenerators();
            await disconnectDB();
            return;
        }

        if (options.command === 'generate-user-relationships') {
            console.log(`Generating user relationships (${options.count} friendships and ${Math.floor(options.count * 1.5)} follow relationships)...`);
            await connectDB();
            // Import all models first
            require('./index').importAllModels();
            await generateUserFriendships(options.count);
            await generateUserFollowRelationships(Math.floor(options.count * 1.5));
            await disconnectDB();
            return;
        }

        if (options.command === 'generate-user-settings') {
            console.log('Generating user settings for all users without settings...');
            await connectDB();
            // Import all models first
            require('./index').importAllModels();
            await generateSettings();
            await disconnectDB();
            return;
        }

        if (options.command === 'generate') {
            if (options.model) {
                console.log(`Generating mock data for ${options.model} (${options.count} records)...`);
                // TODO: Implement single model generation
                console.log('Single model generation not yet implemented. Generating all models...');
            }

            await generateAllMockData(options.count);
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

// Execute
if (require.main === module) {
    run()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
} 