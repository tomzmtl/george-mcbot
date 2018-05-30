const getPendingPullRequests = async (octokit) => {
  const getReviews = number => octokit.pullRequests.getReviews({
    owner: 'fansapp',
    repo: 'ordering-web-app',
    number,
  });

  const { data: prs } = await octokit.pullRequests.getAll({
    owner: 'fansapp',
    repo: 'ordering-web-app',
  });

  const calls = prs.map(async (pr) => {
    const { data: reviews } = await getReviews(pr.number);
    return {
      ...pr,
      reviews,
    };
  });

  return Promise.all(calls);
};


module.exports = getPendingPullRequests;
