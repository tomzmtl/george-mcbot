const prReport = require('../prReport');


module.exports = (bot, data, stop) => {
  if (data.channel === process.env.CODE_REVIEW_CHANNEL_ID) {
    if (data.text === 'report') {
      prReport(bot.octokit, bot);
      stop();
    }
  }
};
