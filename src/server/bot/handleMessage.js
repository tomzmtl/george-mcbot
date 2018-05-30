const prReport = require('./prReport');


module.exports = (data, bot, octokit) => {
  if (data.text === 'ping') {
    return bot.postTo(data.channel, 'pong');
  }

  if (data.text === 'type') {
    return bot.typeAndPost(data.channel, 'typed');
  }

  if (data.channel === process.env.CODE_REVIEW_CHANNEL_ID) {
    if (data.text === 'report') {
      return prReport(octokit, bot);
    }
  }

  return false;
};
