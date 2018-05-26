const getPendingPullRequests = require('../github/getPendingPullRequests');
const formatPr = require('../scm/formatPr');


const filterPending = ({ labels, reviews }) => {
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

const filterApproved = ({ reviews }) =>
  reviews.some(review => review.state === 'APPROVED');

module.exports = (octokit, bot) =>
  getPendingPullRequests(octokit).then(promises => Promise.all(promises).then((prs) => {
    let msg = [];

    const pending = prs.filter(filterPending);
    const pendingCount = pending.length;
    if (pendingCount) {
      msg = msg.concat([
        `*${pendingCount} pending PR${pendingCount === 1 ? '' : 's'}* that need review:`,
        ...pending.map(pr => formatPr(pr, { reviewers: true })),
      ]);
    }

    const approved = prs.filter(filterApproved);
    const approvedCount = approved.length;
    if (approvedCount) {
      msg = msg.concat([
        `*${approvedCount} approved PR${approvedCount === 1 ? '' : 's'}* awaiting merge:`,
        ...approved.map(pr => formatPr(pr)),
      ]);
    }

    if (msg.length) {
      bot.postToReview(msg);
    }
    // bot.postToReview('Nothing to report. Now get back to work, I got things to do.');
  }));
