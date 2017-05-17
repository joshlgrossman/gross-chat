const schedule = require('node-schedule');
const shell = require('./shell');
const Message = require('./documents/Message');

// at 4:00am, daily
const deleteOldMessages = schedule.scheduleJob({minute: 0, hour: 4}, () => {
  const twoDaysAgo = Date.now() - 172800000;

  shell.trace('Cronjob running');
  Message.Model.deleteMany({timestamp: {$lt: twoDaysAgo}})
    .then(response => shell.trace('Old messages deleted'))
    .catch(error => shell.trace(`Cronjob failed: ${error}`));
});

module.exports = {
  deleteOldMessages
};
