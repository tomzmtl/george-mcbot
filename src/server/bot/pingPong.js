const { CONFIG } = require('./constants');


module.exports = (data, bot) => {
  if (data.text === 'ping') {
    bot.postMessage(data.channel, 'pong', CONFIG);
  }
};
