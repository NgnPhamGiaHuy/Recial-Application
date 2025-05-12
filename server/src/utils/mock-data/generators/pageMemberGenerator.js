const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class PageMemberGenerator extends BaseGenerator {
    constructor() {
        super('PageMember');
    }

    async generateOne() {
        let attempts = 0;
        const maxAttempts = 20; // Increased max attempts

        while (attempts < maxAttempts) {
            // Get a random page
            const pageId = await this.getRandomId('Page');
            if (!pageId) {
                throw new Error('No pages available. Please generate pages first.');
            }

            // Get a random user
            const userId = await this.getRandomId('User');
            if (!userId) {
                throw new Error('No users available. Please generate users first.');
            }

            // Check if user is already a member of this page
            const existingMember = await this.model.findOne({
                page_id: pageId,
                'user.user_id': userId
            });

            // If not already a member, proceed with creating the membership
            if (!existingMember) {
                // Get roles - "Admin", "Editor", "Contributor"
                let contributorRole = null;
                let adminRole = null;
                let editorRole = null;

                try {
                    // Try to find existing roles or create them if needed
                    const roleModel = mongoose.model('Role');

                    contributorRole = await roleModel.findOne({
                        $or: [
                            { role_name: 'Contributor' },
                            { roleName: 'Contributor' }
                        ]
                    });

                    if (!contributorRole) {
                        contributorRole = await roleModel.findOne({
                            $or: [
                                { role_name: 'User' },
                                { roleName: 'User' }
                            ]
                        });
                    }

                    adminRole = await roleModel.findOne({
                        $or: [
                            { role_name: 'Admin' },
                            { roleName: 'Admin' }
                        ]
                    });

                    editorRole = await roleModel.findOne({
                        $or: [
                            { role_name: 'Editor' },
                            { roleName: 'Editor' }
                        ]
                    });

                    if (!contributorRole && !adminRole && !editorRole) {
                        console.error('Could not find any suitable roles');

                        // Create a default role as fallback - use the correct field name based on schema
                        const roleSchema = roleModel.schema.paths;
                        const roleNameField = roleSchema.role_name ? 'role_name' : 'roleName';

                        const defaultRoleData = {};
                        defaultRoleData[roleNameField] = 'Contributor';
                        defaultRoleData.role_permissions = JSON.stringify(['read', 'write']);

                        contributorRole = new roleModel(defaultRoleData);
                        await contributorRole.save();
                    }
                } catch (error) {
                    console.error('Error fetching roles:', error);
                    attempts++;
                    continue; // Try again with another user/page pair
                }

                // Determine user role in the page
                // Make 5% admins, 15% editors, 80% regular contributors
                let roleId;
                const roleRandom = Math.random();

                if (roleRandom < 0.05 && adminRole) {
                    roleId = adminRole._id;
                } else if (roleRandom < 0.20 && editorRole) {
                    roleId = editorRole._id;
                } else {
                    roleId = contributorRole._id;
                }

                // Build page member data
                const pageMemberData = {
                    page_id: pageId,
                    user: {
                        user_id: userId,
                        user_role: roleId,
                    }
                };

                return await this.saveDocument(pageMemberData);
            }

            attempts++;
        }

        console.log('Could not find a unique user-page pair after multiple attempts. Skipping.');
        return null; // Return null instead of throwing an error
    }
}

const generatePageMembers = async (count = 150) => {
    // First, ensure each page has at least one admin
    const pageModel = mongoose.model('Page');
    const pages = await pageModel.find({});
    const adminRole = await mongoose.model('Role').findOne({ role_name: 'Admin' });

    if (!adminRole) {
        console.error('Admin role not found. Creating admin users for pages may not work correctly.');
    }

    console.log('📝 Ensuring each page has at least one admin...');
    for (const page of pages) {
        // Check if page already has an admin
        const existingAdmin = await mongoose.model('PageMember').findOne({
            page_id: page._id,
            'user.user_role': adminRole ? adminRole._id : { $exists: true }
        });

        if (!existingAdmin) {
            // Create an admin for this page
            const randomUserId = await new PageMemberGenerator().getRandomId('User');
            if (randomUserId) {
                const pageAdminData = {
                    page_id: page._id,
                    user: {
                        user_id: randomUserId,
                        user_role: adminRole ? adminRole._id : null
                    }
                };

                try {
                    const pageMemberModel = mongoose.model('PageMember');
                    const adminMember = new pageMemberModel(pageAdminData);
                    await adminMember.save();
                    console.log(`✅ Created admin for page: ${page.page_name}`);
                } catch (error) {
                    console.error(`Failed to create admin for page ${page.page_name}:`, error);
                }
            }
        }
    }

    // Then generate regular members
    const generator = new PageMemberGenerator();
    return await generator.generate(count);
};

module.exports = {
    generatePageMembers,
    PageMemberGenerator
}; 