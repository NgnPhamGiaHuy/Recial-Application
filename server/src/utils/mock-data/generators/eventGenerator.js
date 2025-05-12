const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class EventGenerator extends BaseGenerator {
    constructor() {
        super('Event');
    }

    async generateOne() {
        // Event start date - from today to 60 days in the future
        const startDate = faker.date.future({ years: 0.2 });

        // Event end date - from 1 hour to 3 days after the start date
        const endDate = new Date(startDate);
        endDate.setHours(
            startDate.getHours() + faker.number.int({ min: 1, max: 72 })
        );

        // Get a random event type
        const eventTypes = [
            'Conference', 'Workshop', 'Meetup', 'Party', 'Concert',
            'Exhibition', 'Webinar', 'Hackathon', 'Festival', 'Charity Event',
            'Product Launch', 'Networking Event', 'Competition'
        ];

        // Random event colors for calendar display
        const colors = [
            'red', 'blue', 'green', 'orange', 'purple',
            'pink', 'teal', 'yellow', 'indigo', 'amber'
        ];

        // Get random tags for the event
        const tagsCount = faker.number.int({ min: 0, max: 5 });
        const tags = await this.getRandomIds('Tag', tagsCount);

        // Get a random location for the event
        const locationId = await this.getRandomId('Location');

        // Event name with type
        const eventType = faker.helpers.arrayElement(eventTypes);
        const eventName = faker.company.name() + ' ' + eventType;

        // Build event data
        const eventData = {
            event_name: eventName,
            event_description: faker.lorem.paragraphs({ min: 1, max: 3 }),
            event_color: faker.helpers.arrayElement(colors),
            event_privacy: faker.helpers.arrayElement(['Public', 'Private']),
            event_start_datetime: startDate,
            event_end_datetime: endDate,
            event_cover_picture_url: faker.image.url({ width: 1200, height: 600 }),
            event_tags: tags,
            event_location: locationId
        };

        return await this.saveDocument(eventData);
    }
}

const generateEvents = async (count = 50) => {
    const generator = new EventGenerator();
    return await generator.generate(count);
};

module.exports = {
    generateEvents,
    EventGenerator
}; 