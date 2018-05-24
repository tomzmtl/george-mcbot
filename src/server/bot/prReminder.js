const schedule = require('node-schedule');
const prReport = require('./prReport');


const recurrence = {
  dayOfWeek: [new schedule.Range(1, 5)],
  hour: 8,
  minute: 30,
};

module.exports = (octokit, bot) => {
  schedule.scheduleJob(recurrence, () => { // be aware of server TZ
    prReport(octokit, bot);
  });
};
