const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class RoleGenerator extends BaseGenerator {
    constructor() {
        super('Role');
    }

    async generateOne() {
        // This is not used directly, as we generate predefined roles in batch
    }

    async generate() {
        console.log('📝 Generating roles...');

        // Check if roles already exist
        const existingCount = await this.model.countDocuments();
        if (existingCount > 0) {
            console.log(`✅ Roles already exist (${existingCount} found)`);
            return [];
        }

        // Define basic roles for the social media platform
        const roles = [
            { role_name: 'Admin', role_permissions: JSON.stringify(['all']) },
            { role_name: 'User', role_permissions: JSON.stringify(['read', 'write']) },
            { role_name: 'Moderator', role_permissions: JSON.stringify(['read', 'write', 'moderate']) },
            { role_name: 'Guest', role_permissions: JSON.stringify(['read']) },
            // Additional roles for various contexts
            { role_name: 'Editor', role_permissions: JSON.stringify(['read', 'write', 'edit']) },
            { role_name: 'Contributor', role_permissions: JSON.stringify(['read', 'write']) },
            { role_name: 'Member', role_permissions: JSON.stringify(['read', 'write']) },
            { role_name: 'Attendee', role_permissions: JSON.stringify(['read']) },
            { role_name: 'Organizer', role_permissions: JSON.stringify(['read', 'write', 'manage']) },
            { role_name: 'group_member', role_permissions: JSON.stringify(['read', 'write']) },
            { role_name: 'event_member', role_permissions: JSON.stringify(['read']) },
            { role_name: 'page_contributor', role_permissions: JSON.stringify(['read', 'write']) }
        ];

        // Create all roles at once
        try {
            const createdRoles = await this.model.insertMany(roles);
            console.log(`✅ Generated ${createdRoles.length} roles`);
            return createdRoles;
        } catch (error) {
            console.error('Error creating roles:', error);
            return [];
        }
    }
}

const generateRoles = async () => {
    const generator = new RoleGenerator();
    return await generator.generate();
};

module.exports = {
    generateRoles,
    RoleGenerator
}; 