const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class StatusGenerator extends BaseGenerator {
    constructor() {
        super('Status');
    }

    async generateOne() {
        // No need to implement this as we'll be generating statuses in batch
    }

    async generate() {
        console.log('📝 Generating statuses...');

        // Check if statuses already exist
        const existingCount = await this.model.countDocuments();
        if (existingCount > 0) {
            console.log(`✅ Statuses already exist (${existingCount} found)`);
            return [];
        }

        // Predefined statuses for a social media platform
        const statuses = [
            { status_name: 'Active', status_description: 'Content or user is currently active and visible' },
            { status_name: 'Inactive', status_description: 'Content or user is currently not active or visible' },
            { status_name: 'Pending', status_description: 'Waiting for approval or confirmation' },
            { status_name: 'Rejected', status_description: 'Not approved or denied access' },
            { status_name: 'Suspended', status_description: 'Temporarily blocked or restricted access' },
            { status_name: 'Banned', status_description: 'Permanently blocked from the platform' },
            { status_name: 'Under Review', status_description: 'Being reviewed by moderators' },
            { status_name: 'Archived', status_description: 'No longer active but preserved for historical purposes' },
            { status_name: 'Featured', status_description: 'Highlighted or promoted content' },
            { status_name: 'Trending', status_description: 'Currently popular or rapidly gaining engagement' }
        ];

        // Create all statuses at once
        try {
            const createdStatuses = await this.model.insertMany(statuses);
            console.log(`✅ Generated ${createdStatuses.length} statuses`);
            return createdStatuses;
        } catch (error) {
            console.error('Error creating statuses:', error);
            return [];
        }
    }
}

const generateStatuses = async () => {
    const generator = new StatusGenerator();
    return await generator.generate();
};

module.exports = {
    generateStatuses,
    StatusGenerator
}; 