const { random } = require('./helpers');


module.exports = (bbkit, bot) => {
  const msg = '<!channel> '.concat(random([
    'Good morning! jk let\'s scrum :troll:',
    'Let\'s scrum now so I can get back to sleep',
    'Let\'s scrum!',
    'Scrum!',
    'Scrum time!',
  ]));
  bot.postToTeam(msg);
};
