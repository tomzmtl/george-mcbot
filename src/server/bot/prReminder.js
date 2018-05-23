const schedule = require('node-schedule');
const { CONFIG } = require('./constants');
const getPendingPullRequests = require('../github/getPendingPullRequests');


module.exports = (octokit, bot) => {
  schedule.scheduleJob('30 8 * * 1-5', () => { // be aware of server TZ
    getPendingPullRequests(octokit).then(promises => Promise.all(promises).then((pendingPrs) => {
      const prs = pendingPrs.filter(({ reviews }) =>
        !reviews.some(review => review.state === 'APPROVED'));
      const prCount = prs.length;
      if (prCount) {
        const msg = [
          '<!channel> Hey guys!',
          `There ${prCount === 1 ? 'is' : 'are'} *${prCount} available PR${prCount === 1 ? '' : 's'}* awaiting review on the Web Client.`,
          'https://github.com/fansapp/ordering-web-app/pulls',
        ].join('\r');
        bot.postMessage(process.env.CODE_REVIEW_CHANNEL_ID, msg, CONFIG);
      } else {
        bot.postMessage(process.env.CODE_REVIEW_CHANNEL_ID, 'Nothing to report :tada:', CONFIG);
      }
    }));
  });
};
