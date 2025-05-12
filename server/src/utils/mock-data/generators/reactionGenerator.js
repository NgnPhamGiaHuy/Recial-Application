const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class ReactionGenerator extends BaseGenerator {
    constructor() {
        super('Reaction');
    }

    async generateOne() {
        let attempts = 0;
        const maxAttempts = 20; // Increased max attempts

        while (attempts < maxAttempts) {
            // Get a random user as the source of the reaction
            const userId = await this.getRandomId('User');
            if (!userId) {
                throw new Error('No users available. Please generate users first.');
            }

            // Decide what content to react to (Post, Comment, Photo, etc.)
            const contentTypes = ['Post', 'Comment', 'Photo', 'Video', 'Story'];
            const selectedContentType = faker.helpers.arrayElement(contentTypes);

            // Get a random content item of the selected type
            let contentId = await this.getRandomId(selectedContentType);

            // Fallback to Post if the selected content type doesn't exist
            if (!contentId) {
                contentId = await this.getRandomId('Post');
                if (!contentId) {
                    throw new Error('No content available to react to. Please generate posts first.');
                }
            }

            // Check if this user has already reacted to this content
            const existingReaction = await this.model.findOne({
                source_id: userId,
                destination_id: contentId
            });

            // If no existing reaction, proceed with creating it
            if (!existingReaction) {
                // Get reaction types from Type model
                let reactionTypeId;
                try {
                    // Create standard reaction types if they don't exist
                    const reactionTypes = [
                        { type_name: 'Like', type_description: 'Standard like reaction' },
                        { type_name: 'Love', type_description: 'Love reaction' },
                        { type_name: 'Haha', type_description: 'Laughing reaction' },
                        { type_name: 'Wow', type_description: 'Surprised reaction' },
                        { type_name: 'Sad', type_description: 'Sad reaction' },
                        { type_name: 'Angry', type_description: 'Angry reaction' }
                    ];

                    // Try to find an existing reaction type
                    const typeModel = mongoose.model('Type');
                    let reactionType = await typeModel.findOne({
                        type_name: { $in: reactionTypes.map(r => r.type_name) }
                    });

                    // If no reaction types exist, create them
                    if (!reactionType) {
                        for (const rt of reactionTypes) {
                            try {
                                await typeModel.create(rt);
                            } catch (error) {
                                // Ignore duplicate key errors
                                if (error.code !== 11000) {
                                    console.error(`Error creating reaction type ${rt.type_name}:`, error);
                                }
                            }
                        }

                        // Get a random reaction type
                        reactionType = await typeModel.findOne({
                            type_name: { $in: reactionTypes.map(r => r.type_name) }
                        });
                    }

                    // If we still don't have a reaction type, use any available type
                    if (!reactionType) {
                        reactionType = await typeModel.findOne();
                    }

                    reactionTypeId = reactionType ? reactionType._id : null;

                    if (!reactionTypeId) {
                        throw new Error('No reaction types available');
                    }
                } catch (error) {
                    console.error('Error getting reaction type:', error);
                    attempts++;
                    continue;
                }

                // Build reaction data
                const reactionData = {
                    source_id: userId,
                    destination_id: contentId,
                    reaction_type: reactionTypeId
                };

                return await this.saveDocument(reactionData);
            }

            attempts++;
        }

        console.log('Could not find a unique user-content pair for reaction after multiple attempts. Skipping.');
        return null; // Return null instead of throwing error
    }
}

const generateReactions = async (count = 300) => {
    const generator = new ReactionGenerator();
    return await generator.generate(count);
};

module.exports = {
    generateReactions,
    ReactionGenerator
}; 