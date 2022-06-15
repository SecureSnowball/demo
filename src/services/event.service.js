/* eslint-disable class-methods-use-this */
const Event = require('../models/event.model');
const logger = require('../utils/logger.util');

class EventService {
  async index(requestId, filter) {
    logger.debug(`${requestId} EventService.log`);

    const query = {};
    const pageSize = filter.pageSize ? parseInt(filter.pageSize, 10) : 10;
    const pageNo = filter.pageNo ? parseInt(filter.pageNo, 10) : 1;

    const regex = {
      $regex: new RegExp(filter.keyword, 'i'),
    };

    if (filter.keyword) {
      query.$or = [
        { title: regex },
        { category: regex },
        { address: regex },
        { description: regex },
      ];
    }

    if (filter.date) {
      const dateTo = new Date(filter.date);
      const dateFrom = new Date(filter.date);

      dateFrom.setHours(0, 0, 0, 0);
      dateTo.setDate(dateTo.getDate() + 1);
      dateTo.setHours(0, 0, 0, 0);

      query.date = {
        $gte: dateFrom,
        $lt: dateTo,
      };
    }

    if (filter.isVirtual) {
      query.isVirtual = filter.isVirtual === 'true';
    }

    // Requesting one more item than thage page size
    // allows us to check if more events are available or not
    const events = await Event.find(query, {
      title: 1,
      description: 1,
      address: 1,
      isVirtual: 1,
      date: 1,
      category: 1,
    }).limit(pageSize + 1).skip(pageSize * (pageNo - 1)).lean();
    const hasMorePages = events.length === pageSize + 1;
    if (hasMorePages) events.pop();
    return {
      events,
      hasMorePages,
    };
  }

  async save(requestId, eventInput) {
    logger.debug(`${requestId} EventService.save`);
    const event = new Event(eventInput);
    await event.save();
    return event;
  }
}

module.exports = new EventService();
