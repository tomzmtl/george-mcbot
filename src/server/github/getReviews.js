module.exports = async (pr, octokit) => {
  const getReviews = number => octokit.pullRequests.getReviews({
    owner: 'fansapp',
    repo: 'ordering-web-app',
    number,
  });

  const { data: reviews } = await getReviews(pr.number, octokit);

  return {
    ...pr,
    reviews,
  };
};
