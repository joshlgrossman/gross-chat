const schedule = require('node-schedule');
const shell = require('./shell');
const Message = require('./documents/Message');

// at 4:00am, daily
const deleteOldMessages = schedule.scheduleJob({minute: 0, hour: 4}, () => {
  const twoDaysAgo = Date.now() - 172800000;
  Message.Model.deleteMany({timestamp: {$lt: twoDaysAgo}});
});

module.exports = {
  deleteOldMessages
};
