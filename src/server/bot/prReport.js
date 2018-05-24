const { buildMessage } = require('./helpers');
const { humans } = require('../../../.bot.js');
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

  const mention = ({ id, login }) => {
    const human = humans.find(h => h.scmId === id);
    if (!human) {
      return login;
    }

    return `<@${human.memberId}>`;
  };

  if (pr.requested_reviewers.length) {
    msg = msg.concat([
      `Reviewers: ${pr.requested_reviewers.map(user => mention(user)).join(', ')}`,
    ]);
  }

  return buildMessage(msg);
};

module.exports = (octokit, bot) =>
  getPendingPullRequests(octokit).then(promises => Promise.all(promises).then((pendingPrs) => {
    const prs = pendingPrs.filter(filterPrs);
    const prCount = prs.length;
    if (prCount) {
      const msg = [
        `There ${prCount === 1 ? 'is' : 'are'} *${prCount} pending PR${prCount === 1 ? '' : 's'}* on the Web Client:`,
        ...prs.map(pr => makePrMsg(pr)),
      ];
      bot.postToReview(msg);
      return;
    }
    bot.postToReview('Nothing to report. Now get back to work! I got things to do.');
  }));
