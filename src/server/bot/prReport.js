const getPendingPullRequests = require('../scm/getPendingPullRequests');
const formatPr = require('../scm/formatPr');


module.exports = (bbkit, bot) =>
  getPendingPullRequests(bbkit).then((prs) => {
    prs.forEach((pr) => {
      bot.postToReview(formatPr(pr));
    });
  });
