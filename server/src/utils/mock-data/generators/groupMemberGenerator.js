const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class GroupMemberGenerator extends BaseGenerator {
    constructor() {
        super('GroupMember');
    }

    async generateOne() {
        let attempts = 0;
        const maxAttempts = 20; // Increased max attempts

        while (attempts < maxAttempts) {
            // Get a random group
            const groupId = await this.getRandomId('Group');
            if (!groupId) {
                throw new Error('No groups available. Please generate groups first.');
            }

            // Get a random user
            const userId = await this.getRandomId('User');
            if (!userId) {
                throw new Error('No users available. Please generate users first.');
            }

            // Check if user is already a member of this group
            const existingMember = await this.model.findOne({
                group_id: groupId,
                'user.user_id': userId
            });

            // If not already a member, proceed with creating the membership
            if (!existingMember) {
                // Get roles - "Admin", "Moderator", "Member"
                let memberRole = null;
                let adminRole = null;
                let moderatorRole = null;

                try {
                    // Try to find existing roles or create them if needed
                    const roleModel = mongoose.model('Role');

                    memberRole = await roleModel.findOne({
                        $or: [
                            { role_name: 'Member' },
                            { roleName: 'Member' }
                        ]
                    });

                    if (!memberRole) {
                        memberRole = await roleModel.findOne({
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

                    moderatorRole = await roleModel.findOne({
                        $or: [
                            { role_name: 'Moderator' },
                            { roleName: 'Moderator' }
                        ]
                    });

                    if (!memberRole) {
                        console.error('Could not find a default member role');
                        // Create a default role as fallback - use the correct field name based on schema
                        const roleSchema = roleModel.schema.paths;
                        const roleNameField = roleSchema.role_name ? 'role_name' : 'roleName';

                        const defaultRoleData = {};
                        defaultRoleData[roleNameField] = 'Member';
                        defaultRoleData.role_permissions = JSON.stringify(['read', 'write']);

                        memberRole = new roleModel(defaultRoleData);
                        await memberRole.save();
                    }
                } catch (error) {
                    console.error('Error fetching roles:', error);
                    attempts++;
                    continue; // Try again with another user/group pair
                }

                // Determine user role in the group
                // Make 5% admins, 15% moderators, 80% regular members
                let roleId;
                const roleRandom = Math.random();

                if (roleRandom < 0.05 && adminRole) {
                    roleId = adminRole._id;
                } else if (roleRandom < 0.20 && moderatorRole) {
                    roleId = moderatorRole._id;
                } else {
                    roleId = memberRole._id;
                }

                // Build group member data
                const groupMemberData = {
                    group_id: groupId,
                    user: {
                        user_id: userId,
                        user_role: roleId,
                    }
                };

                return await this.saveDocument(groupMemberData);
            }

            attempts++;
        }

        console.log('Could not find a unique user-group pair after multiple attempts. Skipping.');
        return null; // Return null instead of throwing an error
    }
}

const generateGroupMembers = async (count = 150) => {
    // First, ensure each group has at least one admin
    const groupModel = mongoose.model('Group');
    const groups = await groupModel.find({});
    const adminRole = await mongoose.model('Role').findOne({ role_name: 'Admin' });

    if (!adminRole) {
        console.error('Admin role not found. Creating admin users for groups may not work correctly.');
    }

    console.log('📝 Ensuring each group has at least one admin...');
    for (const group of groups) {
        // Check if group already has an admin
        const existingAdmin = await mongoose.model('GroupMember').findOne({
            group_id: group._id,
            'user.user_role': adminRole ? adminRole._id : { $exists: true }
        });

        if (!existingAdmin) {
            // Create an admin for this group
            const randomUserId = await new GroupMemberGenerator().getRandomId('User');
            if (randomUserId) {
                const groupAdminData = {
                    group_id: group._id,
                    user: {
                        user_id: randomUserId,
                        user_role: adminRole ? adminRole._id : null
                    }
                };

                try {
                    const groupMemberModel = mongoose.model('GroupMember');
                    const adminMember = new groupMemberModel(groupAdminData);
                    await adminMember.save();
                    console.log(`✅ Created admin for group: ${group.group_name}`);
                } catch (error) {
                    console.error(`Failed to create admin for group ${group.group_name}:`, error);
                }
            }
        }
    }

    // Then generate regular members
    const generator = new GroupMemberGenerator();
    return await generator.generate(count);
};

module.exports = {
    generateGroupMembers,
    GroupMemberGenerator
}; 