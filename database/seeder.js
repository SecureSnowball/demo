require('dotenv').config();
const { faker } = require('@faker-js/faker');

const Event = require('../src/models/event.model');

const mongoConnection = require('../src/utils/db.util');
const logger = require('../src/utils/logger.util');

const getFakeEvent = () => ({
  title: faker.random.words(2),
  isVirtual: faker.random.numeric() % 2 === 0,
  date: faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z'),
  description: faker.random.words(5),
  category: faker.random.word(),
  address: `${faker.address.city()}, ${faker.address.country()}`,
});

mongoConnection.connect().then(async () => {
  try {
    const events = [];
    for (let i = 0; i < 50; i += 1) {
      events.push(getFakeEvent());
    }
    await Event.insertMany(events);
    process.exit(0);
  } catch (err) {
    logger.fatal(err);
  }
});
