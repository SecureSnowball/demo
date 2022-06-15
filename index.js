require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { port } = require('./src/config');
const eventRoute = require('./src/routes/event.route');
const mongoConnection = require('./src/utils/db.util');
const logger = require('./src/utils/logger.util');
const requestIdMiddleware = require('./src/middlewares/requestId.middleware');

const app = express();

// Middleware registration
app.use(express.json());
app.use(morgan('tiny'));
app.use(requestIdMiddleware);

app.get('/', (_, res) => res.json({
  message: 'Server is up and running',
}));

// Route registration
app.use('/event', eventRoute);

mongoConnection.connect()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Server started listening on port ${port}`);
    });
  });
