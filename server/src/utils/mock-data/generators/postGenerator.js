const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class PostGenerator extends BaseGenerator {
    constructor() {
        super('Post');
    }

    async generateOne() {
        // Get a random user ID
        const userId = await this.getRandomId('User');
        if (!userId) {
            throw new Error('No users available. Please generate users first.');
        }

        // Get the actual User model to update post_list
        const userModel = mongoose.model('User');
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        // Decide post type: regular post, group post, or page post
        const postType = faker.helpers.weightedArrayElement([
            { weight: 0.6, value: 'regular' },  // 60% regular posts
            { weight: 0.25, value: 'group' },   // 25% group posts
            { weight: 0.15, value: 'page' }     // 15% page posts
        ]);

        let groupId = null;
        let pageId = null;

        // Handle group posts - find groups the user is a member of
        if (postType === 'group') {
            try {
                const groupMemberModel = mongoose.model('GroupMember');
                const userMemberships = await groupMemberModel.find({ 'user.user_id': userId }).select('group_id');

                if (userMemberships && userMemberships.length > 0) {
                    // Randomly select one of the groups this user is a member of
                    const randomMembership = faker.helpers.arrayElement(userMemberships);
                    groupId = randomMembership.group_id;
                    console.log(`Creating a group post for group ${groupId} by user ${user.username}`);
                } else {
                    // User is not a member of any groups, fall back to regular post
                    console.log(`User ${user.username} is not a member of any groups, creating regular post instead`);
                }
            } catch (error) {
                console.error('Error finding user group memberships:', error);
                // Fall back to regular post
            }
        }

        // Handle page posts - find pages the user is a member of
        if (postType === 'page') {
            try {
                const pageMemberModel = mongoose.model('PageMember');
                const userPageMemberships = await pageMemberModel.find({ 'user.user_id': userId }).select('page_id');

                if (userPageMemberships && userPageMemberships.length > 0) {
                    // Randomly select one of the pages this user is a member of
                    const randomPageMembership = faker.helpers.arrayElement(userPageMemberships);
                    pageId = randomPageMembership.page_id;
                    console.log(`Creating a page post for page ${pageId} by user ${user.username}`);
                } else {
                    // User is not a member of any pages, fall back to regular post
                    console.log(`User ${user.username} is not a member of any pages, creating regular post instead`);
                }
            } catch (error) {
                console.error('Error finding user page memberships:', error);
                // Fall back to regular post
            }
        }

        // Randomly generate tags
        const tagsCount = faker.number.int({ min: 0, max: 5 });
        const tags = await this.getRandomIds('Tag', tagsCount);

        // Randomly get a location
        const hasLocation = faker.datatype.boolean({ probability: 0.4 });
        let locationId = null;
        if (hasLocation) {
            locationId = await this.getRandomId('Location');
        }

        // Randomly decide if this post has photos (increase probability)
        // 60% of posts will have at least one photo
        const photosCount = faker.helpers.weightedArrayElement([
            { weight: 0.4, value: 0 },
            { weight: 0.3, value: 1 },
            { weight: 0.2, value: 2 },
            { weight: 0.1, value: faker.number.int({ min: 3, max: 5 }) }
        ]);

        const photos = [];

        // Create Post data
        const postData = {
            createdBy: userId,
            post_title: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.7 }),
            post_content: faker.lorem.paragraphs({ min: 1, max: 3 }),
            post_privacy: faker.helpers.arrayElement(['Public', 'Private', 'Friends', 'Specific_Friends']),
            post_tags: tags,
            post_location: locationId,
        };

        // Add group or page reference if applicable
        if (groupId) {
            postData.group = groupId;
        }

        if (pageId) {
            postData.page = pageId;
        }

        // Save the post document
        const post = await this.saveDocument(postData);

        // Create specialized group or page post records if needed
        if (groupId) {
            try {
                const groupPostModel = mongoose.model('GroupPost');
                await groupPostModel.create({
                    post_id: post._id,
                    group_id: groupId
                });
            } catch (error) {
                console.error('Error creating group post reference:', error);
            }
        }

        if (pageId) {
            try {
                const pagePostModel = mongoose.model('PagePost');
                await pagePostModel.create({
                    post_id: post._id,
                    page_id: pageId
                });
            } catch (error) {
                console.error('Error creating page post reference:', error);
            }
        }

        // If we have photos to add, create them now
        if (photosCount > 0) {
            const photoModel = mongoose.model('Photo');

            for (let i = 0; i < photosCount; i++) {
                const photoData = {
                    photo_url: faker.image.url({ width: 1080, height: 1080 }),
                    photo_description: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.5 }),
                    createdBy: userId,
                    post: post._id,
                };

                const photo = new photoModel(photoData);
                await photo.save();

                photos.push(photo._id);

                // Add photo to user's photo_list if not already there
                if (!user.photo_list.includes(photo._id)) {
                    user.photo_list.push(photo._id);
                }
            }

            // Update the post with photo references
            post.post_photos = photos;
            await post.save();
        }

        // Add post to user's post_list if not already there
        if (!user.post_list.includes(post._id)) {
            user.post_list.push(post._id);
            await user.save();
        }

        // Output what kind of post was created
        let postTypeText = 'regular';
        if (groupId) postTypeText = 'group';
        if (pageId) postTypeText = 'page';

        console.log(`Created ${postTypeText} post for user ${user.username} with ${photosCount} photos`);
        return post;
    }
}

const generatePosts = async (count = 100) => {
    const generator = new PostGenerator();
    return await generator.generate(count);
};

module.exports = {
    generatePosts,
    PostGenerator
}; 