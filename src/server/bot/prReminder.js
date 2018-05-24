const schedule = require('node-schedule');
const { buildMessage } = require('./helpers');
const getPendingPullRequests = require('../github/getPendingPullRequests');


const filterPrs = ({ labels, reviews }) => {
  // Exclude approved PRs
  if (reviews.some(review => review.state === 'APPROVED')) {
    return false;
  }

  // Exclude Story PRs
  if (labels.some(label => label.name === 'Story')) {
    return false;
  }

  return true;
};


const makePrMsg = (pr) => {
  let msg = [
    `>>> *${pr.title}*`,
    pr.html_url,
  ];

  if (pr.requested_reviewers.length) {
    msg = msg.concat([
      `Reviewers: ${pr.requested_reviewers.map(user => user.login).join(', ')}`,
    ]);
  }

  return buildMessage(msg);
};

const recurrence = {
  dayOfWeek: [new schedule.Range(1, 5)],
  hour: 8,
  minute: 30,
};

module.exports = (octokit, bot) => {
  schedule.scheduleJob(recurrence, () => { // be aware of server TZ
    getPendingPullRequests(octokit).then(promises => Promise.all(promises).then((pendingPrs) => {
      const prs = pendingPrs.filter(filterPrs);
      const prCount = prs.length;
      if (prCount) {
        const msg = [
          `<!channel> There ${prCount === 1 ? 'is' : 'are'} *${prCount} pending PR${prCount === 1 ? '' : 's'}* on the Web Client:`,
          ...prs.map(pr => makePrMsg(pr)),
        ];
        bot.postToReview(msg);
      }
    }));
  });
};
