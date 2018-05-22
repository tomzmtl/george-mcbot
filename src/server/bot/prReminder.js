const schedule = require('node-schedule');
const { CONFIG } = require('./constants');


const prQuery = {
  owner: 'fansapp',
  repo: 'ordering-web-app',
};

module.exports = (octokit, bot) => {
  schedule.scheduleJob('30 8 * * 1-5', () => { // be aware of server TZ
    octokit.pullRequests.getAll(prQuery).then((r) => {
      const count = r.data.length;
      if (count) {
        const msg = [
          '<!channel> Hey guys!',
          `There ${count === 1 ? 'is' : 'are'} *${count} available PR${count === 1 ? '' : 's'}* awaiting review on the Web Client.`,
          'https://github.com/fansapp/ordering-web-app/pulls',
          'I know, I know, life is cruel...'
        ].join('\r');
        bot.postMessage(process.env.CODE_REVIEW_CHANNEL_ID, msg, CONFIG);
      }
    });
  });
};
