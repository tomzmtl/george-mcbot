const { isSickDayMessage } = require('../helpers');

module.exports = (bot, data, stop) => {
  if (data.type !== 'message') {
    return;
  }

  if (data.channel === process.env.TEAM_CHANNEL_ID) {
    if (isSickDayMessage(data.text)) {
      bot.postMessage(data.channel, `<@${data.user}> Take care!`);
      stop();
    }
  }
};
