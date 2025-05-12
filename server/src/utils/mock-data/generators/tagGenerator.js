const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class TagGenerator extends BaseGenerator {
    constructor() {
        super('Tag');
    }

    async generateOne() {
        const topic = faker.word.adjective() + faker.word.noun();
        const tagName = topic.charAt(0).toLowerCase() + topic.slice(1).replace(/\s+/g, '');

        const tagData = {
            tag_name: tagName,
            tag_description: faker.lorem.sentence()
        };

        return await this.saveDocument(tagData);
    }
}

const generateTags = async (count = 50) => {
    // Generate popular predefined tags first
    const predefinedTags = [
        { tag_name: 'travel', tag_description: 'Posts about traveling and adventures' },
        { tag_name: 'food', tag_description: 'Culinary experiences and recipes' },
        { tag_name: 'fashion', tag_description: 'Style, clothing, and fashion trends' },
        { tag_name: 'technology', tag_description: 'Tech news, gadgets, and innovations' },
        { tag_name: 'fitness', tag_description: 'Health, exercise, and wellness content' },
        { tag_name: 'gaming', tag_description: 'Video games, esports, and gaming culture' },
        { tag_name: 'music', tag_description: 'Songs, artists, and musical events' },
        { tag_name: 'art', tag_description: 'Visual arts, paintings, sculptures, and creative works' },
        { tag_name: 'nature', tag_description: 'Beautiful landscapes and wildlife' },
        { tag_name: 'pets', tag_description: 'Dogs, cats, and other animal companions' },
        { tag_name: 'sports', tag_description: 'Athletic events and competitions' },
        { tag_name: 'books', tag_description: 'Reading, literature, and book recommendations' }
    ];

    // Create predefined tags
    console.log('📝 Generating predefined tags...');
    try {
        const tagModel = mongoose.model('Tag');
        await tagModel.insertMany(predefinedTags, { ordered: false }).catch(err => {
            // Ignore duplicate key errors
            if (err.code !== 11000) {
                throw err;
            }
        });
    } catch (error) {
        console.error('Error creating predefined tags:', error);
    }

    // Generate random tags
    const generator = new TagGenerator();
    try {
        const adjustedCount = Math.max(0, count - predefinedTags.length);
        return await generator.generate(adjustedCount);
    } catch (error) {
        console.error('Error generating random tags:', error);
        return [];
    }
};

module.exports = {
    generateTags,
    TagGenerator
}; 