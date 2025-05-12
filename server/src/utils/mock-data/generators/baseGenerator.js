const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

class BaseGenerator {
    constructor(modelName) {
        this.modelName = modelName;
        this.model = mongoose.model(modelName);
        this.generatedIds = [];
    }

    // Get random document ID from previously generated documents
    async getRandomId(model = this.modelName) {
        try {
            const targetModel = mongoose.model(model);
            const count = await targetModel.countDocuments();

            if (count === 0) return null;

            const random = Math.floor(Math.random() * count);
            const doc = await targetModel.findOne().skip(random);

            return doc ? doc._id : null;
        } catch (error) {
            console.error(`Error getting random ${model} ID:`, error);
            return null;
        }
    }

    // Get multiple random document IDs
    async getRandomIds(model = this.modelName, count = 1) {
        const ids = [];
        for (let i = 0; i < count; i++) {
            const id = await this.getRandomId(model);
            if (id) ids.push(id);
        }
        return ids;
    }

    // Save generated mock document
    async saveDocument(data) {
        try {
            const doc = new this.model(data);
            await doc.save();
            this.generatedIds.push(doc._id);
            return doc;
        } catch (error) {
            console.error(`Error saving ${this.modelName} document:`, error);
            return null;
        }
    }

    // Generate a single mock document
    async generateOne() {
        throw new Error('generateOne method must be implemented by subclass');
    }

    // Generate multiple mock documents
    async generate(count = 50) {
        console.log(`📝 Generating ${count} ${this.modelName} documents...`);

        const docs = [];
        for (let i = 0; i < count; i++) {
            try {
                const doc = await this.generateOne();
                if (doc) docs.push(doc);
            } catch (error) {
                console.error(`Error generating ${this.modelName} document #${i + 1}:`, error);
            }
        }

        console.log(`✅ Generated ${docs.length} ${this.modelName} documents`);
        return docs;
    }
}

module.exports = BaseGenerator; 