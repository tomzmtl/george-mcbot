const schedule = require('node-schedule');
const { CONFIG } = require('./constants');


const random = array => array[Math.floor(Math.random() * array.length)];

module.exports = (octokit, bot) => {
  schedule.scheduleJob('30 9 * * 1-5', () => { // be aware of server TZ
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
