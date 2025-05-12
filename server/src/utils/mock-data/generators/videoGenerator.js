const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class VideoGenerator extends BaseGenerator {
    constructor() {
        super('Video');
    }

    async generateOne() {
        // Get a random user ID
        const userId = await this.getRandomId('User');
        if (!userId) {
            throw new Error('No users available. Please generate users first.');
        }

        // Get the actual User model to update video_list
        const userModel = mongoose.model('User');
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        // Decide video type: regular video, group video, or page video (similar to posts)
        const videoType = faker.helpers.weightedArrayElement([
            { weight: 0.7, value: 'regular' },  // 70% regular videos
            { weight: 0.2, value: 'group' },    // 20% group videos
            { weight: 0.1, value: 'page' }      // 10% page videos
        ]);

        let groupId = null;
        let pageId = null;

        // Handle group videos - find groups the user is a member of
        if (videoType === 'group') {
            try {
                const groupMemberModel = mongoose.model('GroupMember');
                const userMemberships = await groupMemberModel.find({ 'user.user_id': userId }).select('group_id');

                if (userMemberships && userMemberships.length > 0) {
                    // Randomly select one of the groups this user is a member of
                    const randomMembership = faker.helpers.arrayElement(userMemberships);
                    groupId = randomMembership.group_id;
                    console.log(`Creating a group video for group ${groupId} by user ${user.username}`);
                } else {
                    // User is not a member of any groups, fall back to regular video
                    console.log(`User ${user.username} is not a member of any groups, creating regular video instead`);
                }
            } catch (error) {
                console.error('Error finding user group memberships:', error);
                // Fall back to regular video
            }
        }

        // Handle page videos - find pages the user is a member of
        if (videoType === 'page') {
            try {
                const pageMemberModel = mongoose.model('PageMember');
                const userPageMemberships = await pageMemberModel.find({ 'user.user_id': userId }).select('page_id');

                if (userPageMemberships && userPageMemberships.length > 0) {
                    // Randomly select one of the pages this user is a member of
                    const randomPageMembership = faker.helpers.arrayElement(userPageMemberships);
                    pageId = randomPageMembership.page_id;
                    console.log(`Creating a page video for page ${pageId} by user ${user.username}`);
                } else {
                    // User is not a member of any pages, fall back to regular video
                    console.log(`User ${user.username} is not a member of any pages, creating regular video instead`);
                }
            } catch (error) {
                console.error('Error finding user page memberships:', error);
                // Fall back to regular video
            }
        }

        // Get real video files from the public/videos directory
        const videosDir = path.join(process.cwd(), 'public', 'videos');
        let videoFiles = [];

        try {
            // List all mp4 files in the directory
            videoFiles = fs.readdirSync(videosDir)
                .filter(file => file.endsWith('.mp4') && !file.startsWith('.'));
        } catch (error) {
            console.error('Error reading videos directory:', error);
            // Use a fallback if we can't read the directory
            videoFiles = Array.from({ length: 50 }, (_, i) => `video-${i}.mp4`);
        }

        // Randomly choose a video file
        const videoFile = faker.helpers.arrayElement(videoFiles);
        const videoUrl = `/videos/${videoFile}`;
        const videoId = parseInt(videoFile.replace('video-', '').replace('.mp4', ''), 10) || 0;

        // Randomly generate tags
        const tagsCount = faker.number.int({ min: 0, max: 5 });
        const tags = await this.getRandomIds('Tag', tagsCount);

        // Randomly get a location
        const hasLocation = faker.datatype.boolean({ probability: 0.3 });
        let locationId = null;
        if (hasLocation) {
            locationId = await this.getRandomId('Location');
        }

        // Generate realistic video details
        const videoDuration = faker.number.int({ min: 15, max: 300 }); // 15 seconds to 5 minutes
        const videoSizeMB = faker.number.float({ min: 0.5, max: 20, precision: 0.1 }); // 0.5MB to 20MB
        const videoSizeBytes = videoSizeMB * 1024 * 1024; // Convert to bytes

        const resolutions = ['720p', '1080p', '480p', '360p', '4K'];
        const formats = ['MP4', 'MOV', 'AVI', 'WEBM'];

        // Create video data
        const videoData = {
            video_url: videoUrl,
            video_title: faker.helpers.maybe(() => faker.lorem.sentence({ min: 3, max: 8 }), { probability: 0.8 }),
            video_privacy: faker.helpers.arrayElement(['Public', 'Private', 'Friends', 'Specific_Friends']),
            video_size: videoSizeBytes,
            video_format: faker.helpers.arrayElement(formats),
            video_description: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 }),
            video_duration: videoDuration,
            video_thumbnail: `/thumbnails/thumb-${videoId}.jpg`, // Placeholder for thumbnails
            video_resolution: faker.helpers.arrayElement(resolutions),
            video_tags: tags,
            video_location: locationId,
            video_interaction: {
                allow_duet: faker.datatype.boolean({ probability: 0.9 }),
                allow_stitch: faker.datatype.boolean({ probability: 0.8 }),
                allow_comments: faker.datatype.boolean({ probability: 0.95 }),
            },
            createdBy: userId
        };

        // Add group or page reference if applicable
        if (groupId) {
            videoData.group = groupId;
        }

        if (pageId) {
            videoData.page = pageId;
        }

        // Save the video document
        const video = await this.saveDocument(videoData);

        // Add video to user's video_list if not already there
        if (!user.video_list.includes(video._id)) {
            user.video_list.push(video._id);
            await user.save();
        }

        // Output what kind of video was created
        let videoTypeText = 'regular';
        if (groupId) videoTypeText = 'group';
        if (pageId) videoTypeText = 'page';

        console.log(`Created ${videoTypeText} video for user ${user.username}: ${videoUrl}`);
        return video;
    }
}

const generateVideos = async (count = 50) => {
    const generator = new VideoGenerator();
    return await generator.generate(count);
};

module.exports = {
    generateVideos,
    VideoGenerator
}; 