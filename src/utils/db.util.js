const mongoose = require('mongoose');
const { mongoConnectionUri, env } = require('../config');
const logger = require('./logger.util');

const connect = async () => {
  try {
    mongoose.set('debug', env !== 'production');
    await mongoose.connect(mongoConnectionUri);
    logger.info('Database connected successfully');
  } catch (err) {
    logger.fatal('Unable to connect to the database', err);
    process.exit(1);
  }
};

module.exports = { connect };
