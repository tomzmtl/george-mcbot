const schedule = require('node-schedule');
const { CONFIG } = require('./constants');


const random = array => array[Math.floor(Math.random() * array.length)];

const recurrence = {
  dayOfWeek: [new schedule.Range(1, 5)],
  hour: 9,
  minute: 30,
};

module.exports = (octokit, bot) => {
  schedule.scheduleJob(recurrence, () => { // be aware of server TZ
    const msg = '<!channel> '.concat(random([
      'Good morning! jk let\'s scrum :troll:',
      'Let\'s scrum now so I can get back to sleep',
      'Let\'s scrum',
      'Scrum!',
      'Scrum?',
    ]));
    bot.postMessage(process.env.MAIN_CHANNEL_ID, msg, CONFIG);
  });
};
