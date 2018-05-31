const getReviews = require('./getReviews');


module.exports = async (octokit) => {
  const { data: prs } = await octokit.pullRequests.getAll({
    owner: 'fansapp',
    repo: 'ordering-web-app',
  });

  const calls = prs.map(async pr => getReviews(pr, octokit));

  return Promise.all(calls);
};
