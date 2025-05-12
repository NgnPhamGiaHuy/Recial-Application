const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class NotificationGenerator extends BaseGenerator {
    constructor() {
        super('Notification');
    }

    async generateOne() {
        // Get a random user as notification destination
        const userId = await this.getRandomId('User');
        if (!userId) {
            throw new Error('No users available. Please generate users first.');
        }

        // Get notification types from Type model (fallback to these if not available)
        let notificationTypes = [];
        try {
            const typeModel = mongoose.model('Type');
            notificationTypes = await typeModel.find({}).select('_id').lean();
        } catch (error) {
            console.error('Error fetching notification types:', error);
        }

        let notificationType;
        if (notificationTypes.length > 0) {
            notificationType = faker.helpers.arrayElement(notificationTypes)._id;
        } else {
            // Create a default notification type if needed
            const defaultType = await mongoose.model('Type').findOne({ type_name: 'Announcement' });
            if (defaultType) {
                notificationType = defaultType._id;
            } else {
                const typeModel = mongoose.model('Type');
                const newType = new typeModel({
                    type_name: 'Announcement',
                    type_description: 'General system announcement'
                });
                await newType.save();
                notificationType = newType._id;
            }
        }

        // Decide what's the source of the notification
        const sourceTypes = ['Post', 'Video', 'Comment', 'FriendRequest', 'Page', 'Group', 'Event'];
        const selectedSourceType = faker.helpers.arrayElement(sourceTypes);

        // Get the Type document for the source
        let sourceTypeId;
        try {
            const sourceTypeDoc = await mongoose.model('Type').findOne({ type_name: selectedSourceType });
            sourceTypeId = sourceTypeDoc ? sourceTypeDoc._id : notificationType;
        } catch (error) {
            console.error(`Error fetching source type ${selectedSourceType}:`, error);
            sourceTypeId = notificationType;
        }

        // Get a random source item ID
        let sourceItemId = await this.getRandomId(selectedSourceType);
        if (!sourceItemId) {
            // Fallback to User if the selected source type doesn't exist
            sourceItemId = await this.getRandomId('User');
        }

        // Generate random notification content based on source type
        let notificationContent = '';
        switch (selectedSourceType) {
            case 'Post':
                notificationContent = faker.helpers.arrayElement([
                    'liked your post',
                    'commented on your post',
                    'shared your post',
                    'mentioned you in a post',
                    'tagged you in a post'
                ]);
                break;
            case 'Video':
                notificationContent = faker.helpers.arrayElement([
                    'liked your video',
                    'commented on your video',
                    'shared your video',
                    'mentioned you in a video',
                    'created a duet with your video',
                    'watched your video',
                    'uploaded a new video you might like'
                ]);
                break;
            case 'Comment':
                notificationContent = faker.helpers.arrayElement([
                    'replied to your comment',
                    'liked your comment',
                    'mentioned you in a comment',
                    'tagged you in a comment'
                ]);
                break;
            case 'FriendRequest':
                notificationContent = faker.helpers.arrayElement([
                    'sent you a friend request',
                    'accepted your friend request'
                ]);
                break;
            case 'Group':
                notificationContent = faker.helpers.arrayElement([
                    'invited you to join a group',
                    'approved your request to join the group',
                    'made you an admin of the group',
                    'mentioned you in a group post',
                    'uploaded a video to a group you follow'
                ]);
                break;
            case 'Event':
                notificationContent = faker.helpers.arrayElement([
                    'invited you to an event',
                    'mentioned you in an event post',
                    'shared a video from an event you attended',
                    'uploaded a video from an event you\'re interested in'
                ]);
                break;
            case 'Page':
                notificationContent = faker.helpers.arrayElement([
                    'invited you to like a page',
                    'mentioned you in a page post',
                    'uploaded a new video to a page you follow',
                    'went live on a page you follow'
                ]);
                break;
            default:
                notificationContent = faker.helpers.arrayElement([
                    'has a new update for you',
                    'mentioned you',
                    'tagged you',
                    'sent you a message',
                    'shared a video with you'
                ]);
        }

        // Add a random username to the notification
        const username = faker.internet.username();
        notificationContent = `${username} ${notificationContent}`;

        // Build notification data
        const notificationData = {
            source: {
                type: sourceTypeId,
                source_id: sourceItemId
            },
            destination_id: userId,
            notification_content: notificationContent,
            notification_type: notificationType,
            is_read: faker.datatype.boolean({ probability: 0.3 }),
            is_mute: faker.datatype.boolean({ probability: 0.1 })
        };

        // Randomly add tags to the notification (20% chance)
        if (faker.datatype.boolean({ probability: 0.2 })) {
            const tagsCount = faker.number.int({ min: 1, max: 3 });
            notificationData.notification_tags = await this.getRandomIds('Tag', tagsCount);
        }

        return await this.saveDocument(notificationData);
    }
}

const generateNotifications = async (count = 200) => {
    const generator = new NotificationGenerator();
    return await generator.generate(count);
};

module.exports = {
    generateNotifications,
    NotificationGenerator
}; 