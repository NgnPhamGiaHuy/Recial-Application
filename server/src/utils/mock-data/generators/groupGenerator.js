const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class GroupGenerator extends BaseGenerator {
    constructor() {
        super('Group');
    }

    async generateOne() {
        // Get random tags for the group
        const tagsCount = faker.number.int({ min: 1, max: 5 });
        const tags = await this.getRandomIds('Tag', tagsCount);

        // Get a random location for the group
        const locationId = await this.getRandomId('Location');

        // Generate different group types
        const groupTypes = [
            'Community', 'Interest', 'Club', 'Support', 'Education',
            'Professional', 'Buy & Sell', 'Gaming', 'Entertainment', 'Sports',
            'Hobby', 'Lifestyle', 'Health', 'Travel', 'Food', 'Technology'
        ];

        // Generate a group name with type
        const groupType = faker.helpers.arrayElement(groupTypes);
        let groupName;

        // Different group name formats
        const nameFormatRandom = faker.number.int({ min: 1, max: 5 });
        switch (nameFormatRandom) {
            case 1:
                // City-based group
                groupName = `${faker.location.city()} ${groupType} Group`;
                break;
            case 2:
                // Topic enthusiasts
                groupName = `${faker.word.adjective()} ${faker.word.noun()} ${groupType}`;
                break;
            case 3:
                // Professional group
                groupName = `${faker.company.name()} ${groupType} Network`;
                break;
            case 4:
                // Hobby group
                groupName = `${faker.word.adjective()} ${groupType} Enthusiasts`;
                break;
            default:
                // Generic group name
                groupName = `The ${faker.word.adjective()} ${groupType}`;
        }

        // Build group data
        const groupData = {
            group_name: groupName,
            group_description: faker.lorem.paragraphs({ min: 1, max: 3 }),
            group_privacy: faker.helpers.arrayElement(['Public', 'Private']),
            group_visible: faker.datatype.boolean({ probability: 0.9 }), // 90% are visible
            group_picture_url: faker.image.avatar(),
            group_cover_picture_url: faker.image.url({ width: 1200, height: 400 }),
            group_tags: tags,
            group_location: locationId
        };

        return await this.saveDocument(groupData);
    }
}

const generateGroups = async (count = 30) => {
    const generator = new GroupGenerator();
    return await generator.generate(count);
};

module.exports = {
    generateGroups,
    GroupGenerator
}; 