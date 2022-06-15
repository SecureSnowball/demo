module.exports = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  mongoConnectionUri: process.env.MONGO_CONNECTION_URI,
  env: process.env.NODE_ENV || 'production',
};
