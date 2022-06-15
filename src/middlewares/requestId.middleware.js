const uuid = require('uuid');

const requestIdMiddleware = (req, _, next) => {
  const requestIdHeader = req.headers['x-request-id'];
  if (!requestIdHeader) {
    req.requestId = uuid.v4();
  }
  return next();
};

module.exports = requestIdMiddleware;
