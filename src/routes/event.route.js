const router = require('express').Router();
const eventService = require('../services/event.service');
const logger = require('../utils/logger.util');

router.get('/', async (req, res) => {
  try {
    const queryParams = req.query;
    const events = await eventService.index(req.requestId, queryParams);
    return res.json(events);
  } catch (err) {
    logger.fatal(err);
    return res.status(400).json({
      message: 'Unable to retrieve events',
    });
  }
});

module.exports = router;
