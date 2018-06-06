const mongoose = require('mongoose');
const schedule = require('node-schedule');

const recurrence = {
  dayOfWeek: [new schedule.Range(1, 5)],
  hour: 7,
  minute: 0,
};

const Report = mongoose.model('Report', {
  date: { type: Date, default: Date.now },
});

module.exports = (bot) => {
  schedule.scheduleJob(recurrence, () => {
    const report = new Report();
    report.save().then(() => bot.postToSandbox('Created report document for today.'));
  });
};
