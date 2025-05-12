const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class EventMemberGenerator extends BaseGenerator {
    constructor() {
        super('EventMember');
    }

    async generateOne() {
        let attempts = 0;
        const maxAttempts = 20; // Increased max attempts

        while (attempts < maxAttempts) {
            // Get a random event
            const eventId = await this.getRandomId('Event');
            if (!eventId) {
                throw new Error('No events available. Please generate events first.');
            }

            // Get a random user
            const userId = await this.getRandomId('User');
            if (!userId) {
                throw new Error('No users available. Please generate users first.');
            }

            // Check if user is already a member of this event
            const existingMember = await this.model.findOne({
                event_id: eventId,
                'user.user_id': userId
            });

            // If not already a member, proceed with creating the membership
            if (!existingMember) {
                // Get roles - "Organizer", "Co-Organizer", "Attendee"
                let attendeeRole = null;
                let organizerRole = null;
                let coOrganizerRole = null;

                try {
                    // Try to find existing roles or create them if needed
                    const roleModel = mongoose.model('Role');

                    // Search for roles with both patterns (role_name and roleName)
                    attendeeRole = await roleModel.findOne({
                        $or: [
                            { role_name: 'Attendee' },
                            { roleName: 'Attendee' }
                        ]
                    });

                    if (!attendeeRole) {
                        attendeeRole = await roleModel.findOne({
                            $or: [
                                { role_name: 'User' },
                                { roleName: 'User' }
                            ]
                        });
                    }

                    organizerRole = await roleModel.findOne({
                        $or: [
                            { role_name: 'Admin' },
                            { roleName: 'Admin' },
                            { role_name: 'Organizer' },
                            { roleName: 'Organizer' }
                        ]
                    });

                    coOrganizerRole = await roleModel.findOne({
                        $or: [
                            { role_name: 'Moderator' },
                            { roleName: 'Moderator' },
                            { role_name: 'Co-Organizer' },
                            { roleName: 'Co-Organizer' }
                        ]
                    });

                    if (!attendeeRole && !organizerRole && !coOrganizerRole) {
                        console.error('Could not find any suitable roles');

                        // Create a default role as fallback - use the correct field name based on schema
                        const roleSchema = roleModel.schema.paths;
                        const roleNameField = roleSchema.role_name ? 'role_name' : 'roleName';

                        const defaultRoleData = {};
                        defaultRoleData[roleNameField] = 'Attendee';
                        defaultRoleData.role_permissions = JSON.stringify(['read']);

                        attendeeRole = new roleModel(defaultRoleData);
                        await attendeeRole.save();
                    }
                } catch (error) {
                    console.error('Error fetching roles:', error);
                    attempts++;
                    continue;
                }

                // Determine user role in the event
                // Make 5% organizers, 10% co-organizers, 85% attendees
                let roleId;
                const roleRandom = Math.random();

                if (roleRandom < 0.05 && organizerRole) {
                    roleId = organizerRole._id;
                } else if (roleRandom < 0.15 && coOrganizerRole) {
                    roleId = coOrganizerRole._id;
                } else {
                    roleId = attendeeRole._id;
                }

                // Build event member data
                const eventMemberData = {
                    event_id: eventId,
                    user: {
                        user_id: userId,
                        user_role: roleId,
                    }
                };

                return await this.saveDocument(eventMemberData);
            }

            attempts++;
        }

        console.log('Could not find a unique user-event pair after multiple attempts. Skipping.');
        return null; // Return null instead of throwing an error
    }
}

const generateEventMembers = async (count = 200) => {
    // First, ensure each event has at least one organizer
    const eventModel = mongoose.model('Event');
    const events = await eventModel.find({});
    const organizerRole = await mongoose.model('Role').findOne({
        $or: [
            { role_name: 'Admin' },
            { role_name: 'Organizer' }
        ]
    });

    if (!organizerRole) {
        console.error('Organizer role not found. Creating organizers for events may not work correctly.');
    }

    console.log('📝 Ensuring each event has at least one organizer...');
    for (const event of events) {
        // Check if event already has an organizer
        const existingOrganizer = await mongoose.model('EventMember').findOne({
            event_id: event._id,
            'user.user_role': organizerRole ? organizerRole._id : { $exists: true }
        });

        if (!existingOrganizer) {
            // Create an organizer for this event
            const randomUserId = await new EventMemberGenerator().getRandomId('User');
            if (randomUserId) {
                const eventOrganizerData = {
                    event_id: event._id,
                    user: {
                        user_id: randomUserId,
                        user_role: organizerRole ? organizerRole._id : null
                    }
                };

                try {
                    const eventMemberModel = mongoose.model('EventMember');
                    const organizerMember = new eventMemberModel(eventOrganizerData);
                    await organizerMember.save();
                    console.log(`✅ Created organizer for event: ${event.event_name}`);
                } catch (error) {
                    console.error(`Failed to create organizer for event ${event.event_name}:`, error);
                }
            }
        }
    }

    // Generate random attendances based on event popularity
    // More popular events have more attendees
    console.log('📝 Generating event attendees with varying popularity...');

    const popularityFactor = count / events.length;
    let totalGenerated = 0;

    for (const event of events) {
        // Random event popularity factor - some events are more popular than others
        const eventPopularity = faker.number.float({ min: 0.2, max: 2.0 });
        const eventMembersCount = Math.floor(popularityFactor * eventPopularity);

        console.log(`Generating ${eventMembersCount} attendees for event: ${event.event_name}`);

        // Generate members for this specific event
        const generator = new EventMemberGenerator();
        for (let i = 0; i < eventMembersCount; i++) {
            try {
                await generator.generateOne();
                totalGenerated++;
            } catch (error) {
                // Skip if there's an error (like duplicate user)
            }

            // Stop if we've reached the total count
            if (totalGenerated >= count) break;
        }

        // Stop if we've reached the total count
        if (totalGenerated >= count) break;
    }

    console.log(`✅ Generated ${totalGenerated} event members`);

    return totalGenerated;
};

module.exports = {
    generateEventMembers,
    EventMemberGenerator
}; 