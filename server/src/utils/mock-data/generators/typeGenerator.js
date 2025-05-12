const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class TypeGenerator extends BaseGenerator {
    constructor() {
        super('Type');
    }

    async generateOne() {
        // No need to implement this as we'll be generating types in batch
    }

    async generate() {
        console.log('📝 Generating types...');

        // Check if types already exist
        const existingCount = await this.model.countDocuments();
        if (existingCount > 0) {
            console.log(`✅ Types already exist (${existingCount} found)`);
            return [];
        }

        // Predefined types for a social media platform
        const types = [
            { type_name: 'Post', type_description: 'Regular user post content' },
            { type_name: 'Photo', type_description: 'Image-based content' },
            { type_name: 'Video', type_description: 'Video-based content' },
            { type_name: 'Story', type_description: 'Temporary content that disappears after 24 hours' },
            { type_name: 'Event', type_description: 'Scheduled real-world or online gathering' },
            { type_name: 'Group', type_description: 'Community space for users with common interests' },
            { type_name: 'Page', type_description: 'Public profile for brands, businesses, or organizations' },
            { type_name: 'Comment', type_description: 'Response to another piece of content' },
            { type_name: 'Message', type_description: 'Private communication between users' },
            { type_name: 'Poll', type_description: 'Question with voting options' },
            { type_name: 'Live', type_description: 'Real-time video stream' }
        ];

        // Create all types at once
        try {
            const createdTypes = await this.model.insertMany(types);
            console.log(`✅ Generated ${createdTypes.length} types`);
            return createdTypes;
        } catch (error) {
            console.error('Error creating types:', error);
            return [];
        }
    }
}

const generateTypes = async () => {
    const generator = new TypeGenerator();
    return await generator.generate();
};

module.exports = {
    generateTypes,
    TypeGenerator
}; 