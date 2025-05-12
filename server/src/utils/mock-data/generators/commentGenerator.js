const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class CommentGenerator extends BaseGenerator {
    constructor() {
        super('Comment');
    }

    async generateOne() {
        // Get a random user for the comment author
        const userId = await this.getRandomId('User');
        if (!userId) {
            throw new Error('No users available. Please generate users first.');
        }

        // Randomly decide if comment has tags
        const hasCommentTags = faker.datatype.boolean({ probability: 0.3 });
        const commentTags = [];
        if (hasCommentTags) {
            const tagsCount = faker.number.int({ min: 1, max: 3 });
            const tags = await this.getRandomIds('Tag', tagsCount);
            commentTags.push(...tags);
        }

        // Randomly decide the content type to comment on (Post, Photo, Video, etc.)
        // In a real implementation, we should check which content types actually exist in the DB
        const contentTypes = ['Post', 'Photo', 'Video', 'Story'];
        const selectedContentType = faker.helpers.arrayElement(contentTypes);

        // Get a random content item of the selected type
        let contentId = await this.getRandomId(selectedContentType);

        // Fallback to Post if the selected content type doesn't exist
        if (!contentId) {
            contentId = await this.getRandomId('Post');
            if (!contentId) {
                throw new Error('No content available to comment on. Please generate posts first.');
            }
        }

        // Build comment data
        const commentData = {
            source_id: userId,
            destination_id: contentId,
            comment_text: faker.lorem.paragraph(),
            comment_tags: commentTags,
        };

        // Randomly add a photo URL to the comment (10% chance)
        if (faker.datatype.boolean({ probability: 0.1 })) {
            commentData.comment_content_url = faker.image.url();
        }

        return await this.saveDocument(commentData);
    }
}

const generateComments = async (count = 100) => {
    const generator = new CommentGenerator();
    return await generator.generate(count);
};

module.exports = {
    generateComments,
    CommentGenerator
}; 