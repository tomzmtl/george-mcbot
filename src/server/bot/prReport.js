const getPendingPullRequests = require('../scm/getPendingPullRequests');
const formatPr = require('../scm/formatPr');


module.exports = (bbkit, bot) =>
  getPendingPullRequests(bbkit).then((prs) => {
    if (prs.length) {
      return Promise.all(prs.map(pr => bot.postToReview(formatPr(pr))));
    }
    return bot.postToReview(':poop:');
  });
