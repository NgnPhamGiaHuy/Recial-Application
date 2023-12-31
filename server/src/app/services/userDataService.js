const User = require("../models/User");
const Message = require("../models/Message");
const Event = require("../models/Event");
const EventMember = require("../models/EventMember");
const FriendRequest = require("../models/FriendRequest");
const Notification = require("../models/Notification");
const Type = require("../models/Type");
const Post = require("../models/Post");
const Group = require("../models/Group");
const Page = require("../models/Page");
const Video = require("../models/Video");
const SearchHistory = require("../models/SearchHistory");
const Photo = require("../models/Photo");
const Setting = require("../models/Setting");
const GroupMember = require("../models/GroupMember");

async function getUserById(userId) {
    const user = await User.findById(userId);

    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        profile_picture_url: user.profile_picture_url,
    }
}

async function getFullUserById(userId) {
    return User.findById(userId);
}

async function getUserMessages(userId) {
    const messages = await Message.find({ destination_id: userId })
        .populate('destination_id', 'email username firstname lastname profile_picture_url')
        .populate('source', 'email username firstname lastname profile_picture_url');

    const messageProps = messages.map(message => ({
        _id: message._id,
        source: {
            _id: message.source._id,
            email: message.source.email,
            username: message.source.username,
            firstname: message.source.firstname,
            lastname: message.source.lastname,
            profile_picture_url: message.source.profile_picture_url,
        },
        destination: {
            _id: message.destination_id._id,
            email: message.destination_id.email,
            username: message.destination_id.username,
            firstname: message.destination_id.firstname,
            lastname: message.destination_id.lastname,
            profile_picture_url: message.destination_id.profile_picture_url,
        },
        message_content: message.message_content,
        message_tags: message.message_tags,
        is_read: message.is_read,
        is_mute: message.is_mute,
        created_at: message.createdAt,
        updated_at: message.updatedAt
    }));

    return messageProps;
}

async function getUserSocial(user) {
    return await Promise.all(user.map(async social => {
        return {
            user: await this.getUserById(social),
        }
    }));
};

async function getUserFriendRequest(user) {
    const userFriendRequestData = await FriendRequest.find({ destination_id: user._id });

    const requests = await Promise.all(userFriendRequestData.map(async request => {
        return {
            _id: request._id,
            user: await this.getUserById(request.source_id),
            created_at: request.createdAt,
            updated_at: request.updatedAt,
        };
    }));

    const sortedRequests = requests.sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
    });

    return sortedRequests;
}

async function getUserSearchQuery(userId) {
    return SearchHistory.find({ source_id: userId});
}

async function getUserNotifications(userId) {
    const notifications = await Notification.find({ destination_id: userId });

    return await Promise.all(notifications.map(async notification => {
        const sourceType = await Type.findById(notification.source.type);
        const notificationType = await Type.findById(notification.notification_type);

        let relatedData = null;
        let sourceProps = null;
        switch (sourceType.type_name) {
            case 'Post':
                relatedData = await Post.findById(notification.source.source_id);
                const userProps = await User.findOne({ post_list: relatedData._id });
                sourceProps = userProps.profile_picture_url;
                break;
            case 'Group':
                relatedData = await Group.findById(notification.source.source_id);
                sourceProps = relatedData.group_picture_url;
                break;
            case 'Page':
                relatedData = await Page.findById(notification.source.source_id);
                sourceProps = relatedData.page_picture_url;
                break;
            case 'Video':
                relatedData = await Video.findById(notification.source.source_id);
                sourceProps = relatedData.video_thumbnail;
                break;
            case 'Photo':
                relatedData = await Photo.findById(notification.source.source_id);
                sourceProps = relatedData.photo_url;
                break;
            default:
                console.log(`Type ${sourceType.type_name} not handled`);
                break;
        };

        return {
            _id: notification._id,
            source: {
                type: notification.source.type,
                sourceProps: sourceProps,
            },
            destination_id: notification.destination_id,
            notification_content: notification.notification_content,
            notification_type: notificationType.type_name,
            is_read: notification.is_read,
            is_mute: notification.is_mute,
            created_at: notification.createdAt,
            updated_at: notification.updatedAt,
        }
    }));
};

async function getUserPhotoList(photo_list) {
    return await Promise.all(photo_list.map(async photo => {
        const photoProps = await Photo.findById(photo);

        return {
            _id: photoProps._id,
            photo_url: photoProps.photo_url,
            photo_title: photoProps.photo_title,
            photo_description: photoProps.photo_description,
            photo_tags: photoProps.photo_tags,
            photo_location: photoProps.photo_location,
            created_at: photoProps.createdAt,
            updated_at: photoProps.updatedAt,
        };
    }));
};

async function getUserGroup(userId) {
    const groupMember = await GroupMember.find({ "user.user_id": userId });

    return await Promise.all(groupMember.map(async group => {
        const groupProps = await Group.findById(group.group_id);

        const usersProps = await Promise.all(group.user.map(async user => {
            const userProps = await User.findById(user.user_id);

            return {
                _id: userProps._id,
                email: userProps.email,
                username: userProps.username,
                firstname: userProps.firstname,
                lastname: userProps.lastname,
                profile_picture_url: userProps.profile_picture_url,
            }
        }))

        return {
            _id: groupProps._id,
            group_name: groupProps.group_name,
            group_member: usersProps,
            group_privacy: groupProps.group_privacy,
            group_picture_url: groupProps.group_picture_url,
            group_cover_picture_url: groupProps.group_cover_picture_url,
            created_at: groupProps.createdAt,
            updated_at: groupProps.updatedAt,
        }
    }));
};

async function getUserSetting(userId) {
    return Setting.findOne({source_id: userId});
};

async function getSuggestedEvents() {
    return Event.aggregate([
        { $sample: { size: 3 } },
        { $sort: { createdAt: -1 } }
    ]);
};

async function getSuggestedPages() {
    return Page.aggregate([
        { $sample: { size: 3 } },
        { $sort: { createdAt: -1 } }
    ]);
};

async function getSuggestedGroup() {
    const suggestGroups = await Group.aggregate([
        { $sample: { size: 1 } },
    ]);

    const suggestGroupMembers = await GroupMember.find({ group_id: suggestGroups[0]._id })

    const suggestGroupMembersProps = await Promise.all(suggestGroupMembers[0].user.map(async user => {
        const userMember = await User.findById(user.user_id);
        return {
            _id: userMember._id,
            email: userMember.email,
            username: userMember.username,
            firstname: userMember.firstname,
            lastname: userMember.lastname,
            profile_picture_url: userMember.profile_picture_url,
        }
    }))

    return {
        ...suggestGroups[0],
        members: suggestGroupMembersProps,
    }
}

module.exports = {getUserById, getFullUserById, getUserSetting, getUserMessages, getUserFriendRequest, getUserSearchQuery, getUserSocial, getUserNotifications, getUserPhotoList, getUserGroup, getSuggestedEvents, getSuggestedPages, getSuggestedGroup};