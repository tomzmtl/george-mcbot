const getPendingPullRequests = require('../github/getPendingPullRequests');
const formatPr = require('../scm/formatPr');


module.exports = (octokit, bot) =>
  getPendingPullRequests(octokit).then((prs) => {
    prs.forEach((pr) => {
      bot.postToReview(formatPr(pr));
    });
  });
