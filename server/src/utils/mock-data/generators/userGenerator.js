const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const BaseGenerator = require('./baseGenerator');

class UserGenerator extends BaseGenerator {
    constructor() {
        super('User');
    }

    async generateOne() {
        const gender = faker.person.sexType();
        const firstName = faker.person.firstName(gender);
        const lastName = faker.person.lastName();
        const username = faker.internet.username({ firstName, lastName }).toLowerCase();

        // Get default user role
        let roles = [];
        try {
            const defaultRole = await mongoose.model('Role').findOne({ role_name: 'User' });
            if (defaultRole) {
                roles = [defaultRole._id];
            }
        } catch (error) {
            console.error('Failed to fetch default role:', error);
        }

        const userData = {
            // User properties
            email: faker.internet.email({ firstName, lastName }),
            username,
            password: await bcrypt.hash('password123', 10),
            refreshToken: '',
            isOAuthUser: faker.datatype.boolean({ probability: 0.2 }),

            // Profile properties
            first_name: firstName,
            last_name: lastName,
            fullName: `${firstName} ${lastName}`,
            bio: faker.lorem.paragraph(),
            birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
            gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),

            // Social properties
            friends: [],
            followers: [],
            following: [],

            // Contact properties
            phone: faker.phone.number(),
            website: faker.internet.url(),
            address: faker.location.streetAddress(),

            // Media properties
            avatar: faker.image.avatar(),
            coverPhoto: faker.image.url(),
            photos: [],
            videos: [],

            // Permissions properties
            roles,
            status: 'Active',
        };

        return await this.saveDocument(userData);
    }
}

const generateUsers = async (count = 50) => {
    const generator = new UserGenerator();
    return await generator.generate(count);
};

module.exports = {
    generateUsers,
    UserGenerator
}; 