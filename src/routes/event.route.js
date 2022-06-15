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

router.post('/', async (req, res) => {
  try {
    const input = req.body;
    const event = await eventService.save(req.requestId, input);
    return res.json(event);
  } catch (err) {
    logger.fatal(err);
    return res.status(400).json({
      message: 'Unable to save event',
    });
  }
});

module.exports = router;
