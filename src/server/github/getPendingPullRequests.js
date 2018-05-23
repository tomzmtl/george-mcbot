module.exports = octokit => octokit.pullRequests.getAll({
  owner: 'fansapp',
  repo: 'ordering-web-app',
})
  .then(({ data: allPrs }) => allPrs.map(pr => octokit.pullRequests.getReviews({
    owner: 'fansapp',
    repo: 'ordering-web-app',
    number: pr.number,
  })
    .then(({ data: reviews }) => ({
      ...pr,
      reviews,
    }))));
