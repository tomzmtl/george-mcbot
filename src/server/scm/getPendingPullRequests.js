const getFullPr = require('./getFullPr');


module.exports = async (bbkit) => {
  const owaPrs = await bbkit.pullRequests.getAll('ordering-web-app');
  const gmcPrs = await bbkit.pullRequests.getAll('merchant-center-web-app');
  const onboardingPrs = await bbkit.pullRequests.getAll('onboarding-web-app');

  const prs = [
    ...(owaPrs.values || []),
    ...(gmcPrs.values || []),
    ...(onboardingPrs.values || []),
  ];

  const calls = prs.map(async pr => getFullPr(pr, bbkit));

  return Promise.all(calls);
};
