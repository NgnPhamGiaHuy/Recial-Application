const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class LocationGenerator extends BaseGenerator {
    constructor() {
        super('Location');
    }

    async generateOne() {
        // Generate random coordinates within a reasonable range
        const latitude = faker.location.latitude();
        const longitude = faker.location.longitude();

        const locationData = {
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.country(),
            geometry: {
                type: 'Point',
                coordinates: [longitude, latitude], // GeoJSON uses [longitude, latitude] order
            },
        };

        return await this.saveDocument(locationData);
    }
}

const generatePopularLocations = async () => {
    console.log('📝 Generating popular world locations...');

    const popularLocations = [
        {
            city: 'New York',
            state: 'NY',
            country: 'United States',
            geometry: { type: 'Point', coordinates: [-74.006, 40.7128] }
        },
        {
            city: 'Los Angeles',
            state: 'CA',
            country: 'United States',
            geometry: { type: 'Point', coordinates: [-118.2437, 34.0522] }
        },
        {
            city: 'London',
            state: '',
            country: 'United Kingdom',
            geometry: { type: 'Point', coordinates: [-0.1278, 51.5074] }
        },
        {
            city: 'Paris',
            state: '',
            country: 'France',
            geometry: { type: 'Point', coordinates: [2.3522, 48.8566] }
        },
        {
            city: 'Tokyo',
            state: '',
            country: 'Japan',
            geometry: { type: 'Point', coordinates: [139.6917, 35.6895] }
        },
        {
            city: 'Sydney',
            state: 'NSW',
            country: 'Australia',
            geometry: { type: 'Point', coordinates: [151.2093, -33.8688] }
        },
        {
            city: 'Dubai',
            state: '',
            country: 'United Arab Emirates',
            geometry: { type: 'Point', coordinates: [55.2708, 25.2048] }
        },
        {
            city: 'Singapore',
            state: '',
            country: 'Singapore',
            geometry: { type: 'Point', coordinates: [103.8198, 1.3521] }
        },
        {
            city: 'Berlin',
            state: '',
            country: 'Germany',
            geometry: { type: 'Point', coordinates: [13.4050, 52.5200] }
        },
        {
            city: 'Toronto',
            state: 'ON',
            country: 'Canada',
            geometry: { type: 'Point', coordinates: [-79.3832, 43.6532] }
        }
    ];

    try {
        const locationModel = mongoose.model('Location');
        await locationModel.insertMany(popularLocations, { ordered: false }).catch(err => {
            // Ignore duplicate key errors
            if (err.code !== 11000) {
                throw err;
            }
        });
        console.log(`✅ Generated ${popularLocations.length} popular locations`);
    } catch (error) {
        console.error('Error creating popular locations:', error);
    }
};

const generateLocations = async (count = 50) => {
    // First generate popular predefined locations
    await generatePopularLocations();

    // Then generate random locations
    const generator = new LocationGenerator();
    const adjustedCount = Math.max(0, count - 10); // 10 is the number of predefined locations
    return await generator.generate(adjustedCount);
};

module.exports = {
    generateLocations,
    LocationGenerator
}; 