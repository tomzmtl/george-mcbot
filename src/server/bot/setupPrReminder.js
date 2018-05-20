const schedule = require('node-schedule');


const prQuery = {
  owner: 'fansapp',
  repo: 'ordering-web-app',
};

module.exports = (octokit, bot) => {
  schedule.scheduleJob('30 8 * * 1-5', () => {
    octokit.pullRequests.getAll(prQuery).then((r) => {
      const prCount = 1 || r.data.length;
      if (prCount) {
        const msg = [
          '<!channel> Good morning people! :cat:',
          `There ${prCount === 1 ? 'is' : 'are'} *${prCount} available PR${prCount === 1 ? '' : 's'}* awaiting review on the Web Client.`,
          'https://github.com/fansapp/ordering-web-app/pulls',
        ].join('\r');
        bot.postMessage(process.env.CODE_REVIEW_CHANNEL_ID, msg);
      }
    });
  });
};
