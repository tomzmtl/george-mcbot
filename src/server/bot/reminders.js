const schedule = require('node-schedule');
const scrumReminder = require('./scrumReminder');
const prReport = require('./prReport');


const dayOfWeek = [new schedule.Range(1, 5)];

module.exports = (bbkit, bot) => {
  // scrum
  schedule.scheduleJob({
    dayOfWeek,
    hour: 9,
    minute: 30,
  }, () => { // be aware of server TZ
    scrumReminder(bbkit, bot);
  });

  // PR
  schedule.scheduleJob({
    dayOfWeek,
    hour: 8,
    minute: 30,
  }, () => { // be aware of server TZ
    prReport(bbkit, bot);
  });
};
