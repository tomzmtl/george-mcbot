const benderSpeech = require('./benderSpeech');
const { isSickDayMessage } = require('./helpers');


module.exports = (data, bot) => {
  if (data.type === 'hello') {
    return bot.postToSandbox('`ready.to.kill.all.humans!`');
  }

  if (data.type === 'message') {
    if (data.text === 'ping') {
      return bot.postTo(data.channel, 'pong');
    }

    if (data.text === 'type') {
      return bot.typeAndPost(data.channel, 'typed');
    }

    if (process.env.TEAM_CHANNEL_ID) {
      if (isSickDayMessage(data.text)) {
        return bot.postTo(data.channel, `<@${data.user}> Take care!`);
      }

      return benderSpeech(data, bot);
    }
  }

  return false;
};
