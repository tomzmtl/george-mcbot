const schedule = require('node-schedule');
const { CONFIG } = require('./constants');
const getPendingPullRequests = require('../github/getPendingPullRequests');


const filterApprovedPrs = ({ reviews }) =>
  !reviews.some(review => review.state === 'APPROVED');

const makePrMsg = (pr) => {
  let msg = [
    `>>> *${pr.title}*`,
    pr.html_url,
  ];

  if (pr.requested_reviewers.length) {
    msg = msg.concat([
      `Reviewers: ${pr.requested_reviewers.map(user => user.login).join(' ')}`,
    ]);
  }

  return msg.join('\r');
};

module.exports = (octokit, bot) => {
  schedule.scheduleJob('30 8 * * 1-5', () => { // be aware of server TZ
    getPendingPullRequests(octokit).then(promises => Promise.all(promises).then((pendingPrs) => {
      const prs = pendingPrs.filter(filterApprovedPrs);
      const prCount = prs.length;
      if (prCount) {
        const msg = [
          `<!channel> There ${prCount === 1 ? 'is' : 'are'} *${prCount} pending PR${prCount === 1 ? '' : 's'}* on the Web Client:`,
          ...prs.map(pr => makePrMsg(pr)),
        ].join('\r');
        bot.postMessage(process.env.CODE_REVIEW_CHANNEL_ID, msg, CONFIG);
      }
    }));
  });
};
