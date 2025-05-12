const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class PageGenerator extends BaseGenerator {
    constructor() {
        super('Page');
    }

    async generateOne() {
        // Get random tags for the page
        const tagsCount = faker.number.int({ min: 1, max: 5 });
        const tags = await this.getRandomIds('Tag', tagsCount);

        // Get a random location for the page
        const locationId = await this.getRandomId('Location');

        // Generate different page types
        const pageTypes = [
            'Business', 'Brand', 'Product', 'Artist', 'Public Figure', 'Entertainment',
            'Cause', 'Community', 'Organization', 'Education', 'Food', 'Sports Team',
            'Restaurant', 'Website', 'Service', 'Local Business', 'Health', 'Musician/Band'
        ];

        // Generate a page name
        const pageType = faker.helpers.arrayElement(pageTypes);
        let pageName;

        // Different page name formats based on page type
        if (pageType === 'Business' || pageType === 'Brand' || pageType === 'Company' || pageType === 'Product') {
            pageName = faker.company.name();
        } else if (pageType === 'Artist' || pageType === 'Public Figure' || pageType === 'Musician/Band') {
            pageName = faker.person.fullName();
        } else if (pageType === 'Restaurant' || pageType === 'Food') {
            pageName = faker.helpers.arrayElement([
                `${faker.word.adjective()} ${faker.animal.type()}`,
                `The ${faker.word.adjective()} ${faker.commerce.productMaterial()}`,
                `${faker.location.city()} ${faker.commerce.productAdjective()}`,
                `${faker.commerce.productAdjective()} ${faker.commerce.department()}`
            ]);
        } else {
            pageName = `${faker.word.adjective()} ${pageType}`;
        }

        // Build page data
        const pageData = {
            page_name: pageName,
            page_description: faker.lorem.paragraphs({ min: 1, max: 3 }),
            page_privacy: faker.helpers.arrayElement(['Public', 'Private']),
            page_picture_url: faker.image.avatar(),
            page_cover_picture_url: faker.image.url({ width: 1200, height: 400 }),
            page_tags: tags,
            page_location: locationId
        };

        return await this.saveDocument(pageData);
    }
}

const generatePages = async (count = 30) => {
    const generator = new PageGenerator();
    return await generator.generate(count);
};

module.exports = {
    generatePages,
    PageGenerator
}; 