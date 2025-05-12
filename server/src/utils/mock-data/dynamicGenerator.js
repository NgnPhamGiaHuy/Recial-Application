const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./generators/baseGenerator');
const { getModelStructure } = require('./modelScanner');

class DynamicGenerator extends BaseGenerator {
    constructor(modelName) {
        super(modelName);
        this.structure = null;
    }

    async init() {
        try {
            this.structure = getModelStructure(this.modelName);
            return !!this.structure;
        } catch (error) {
            console.error(`Failed to initialize dynamic generator for ${this.modelName}:`, error);
            return false;
        }
    }

    // Generate a dynamic value based on field type
    async generateFieldValue(fieldName, fieldConfig) {
        // Handle references to other models
        if (fieldConfig.ref) {
            if (fieldConfig.isArray) {
                const count = faker.number.int({ min: 0, max: 5 });
                return await this.getRandomIds(fieldConfig.ref, count);
            } else {
                return await this.getRandomId(fieldConfig.ref);
            }
        }

        // Handle enum values
        if (fieldConfig.enum && fieldConfig.enum.length > 0) {
            return faker.helpers.arrayElement(fieldConfig.enum);
        }

        // Handle different field types
        switch (fieldConfig.type) {
            case 'String':
                if (fieldName.toLowerCase().includes('name')) {
                    return faker.person.fullName();
                } else if (fieldName.toLowerCase().includes('email')) {
                    return faker.internet.email();
                } else if (fieldName.toLowerCase().includes('password')) {
                    return faker.internet.password();
                } else if (fieldName.toLowerCase().includes('phone')) {
                    return faker.phone.number();
                } else if (fieldName.toLowerCase().includes('url') || fieldName.toLowerCase().includes('link')) {
                    return faker.internet.url();
                } else if (fieldName.toLowerCase().includes('description') || fieldName.toLowerCase().includes('content')) {
                    return faker.lorem.paragraphs();
                } else if (fieldName.toLowerCase().includes('title')) {
                    return faker.lorem.sentence();
                } else if (fieldName.toLowerCase().includes('address')) {
                    return faker.location.streetAddress();
                } else if (fieldName.toLowerCase().includes('color')) {
                    return faker.internet.color();
                } else if (fieldName.toLowerCase().includes('username')) {
                    return faker.internet.userName();
                } else {
                    return faker.lorem.words(3);
                }
            case 'Number':
                return faker.number.int({ min: 0, max: 1000 });
            case 'Date':
                return faker.date.past();
            case 'Boolean':
                return faker.datatype.boolean();
            case 'ObjectID':
                return mongoose.Types.ObjectId();
            case 'Array':
                if (fieldConfig.isArray) {
                    return [];
                }
                return [];
            default:
                return null;
        }
    }

    async generateOne() {
        if (!this.structure) {
            const initialized = await this.init();
            if (!initialized) throw new Error(`Failed to initialize structure for ${this.modelName}`);
        }

        const data = {};

        // Generate data for each field
        for (const [fieldName, fieldConfig] of Object.entries(this.structure)) {
            try {
                data[fieldName] = await this.generateFieldValue(fieldName, fieldConfig);
            } catch (error) {
                console.error(`Error generating value for field ${fieldName}:`, error);
                data[fieldName] = null;
            }
        }

        return await this.saveDocument(data);
    }
}

// Function to generate mock data for a model that doesn't have a specific generator
const generateDynamicMockData = async (modelName, count = 50) => {
    const generator = new DynamicGenerator(modelName);
    return await generator.generate(count);
};

module.exports = {
    DynamicGenerator,
    generateDynamicMockData
}; 