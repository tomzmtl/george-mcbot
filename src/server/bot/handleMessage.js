const benderSpeech = require('./benderSpeech');
const prReport = require('./prReport');
const { isSickDayMessage } = require('./helpers');


module.exports = (data, bot, octokit) => {
  if (data.text === 'ping') {
    return bot.postTo(data.channel, 'pong');
  }

  if (data.text === 'type') {
    return bot.typeAndPost(data.channel, 'typed');
  }

  if (process.env.CODE_REVIEW_CHANNEL_ID) {
    if (data.text === 'report') {
      return prReport(octokit, bot);
    }
  }


  if (process.env.TEAM_CHANNEL_ID) {
    if (isSickDayMessage(data.text)) {
      return bot.postTo(data.channel, `<@${data.user}> Take care!`);
    }

    return benderSpeech(data, bot);
  }

  return false;
};
