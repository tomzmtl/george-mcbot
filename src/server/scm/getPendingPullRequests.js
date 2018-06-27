const getFullPr = require('./getFullPr');


module.exports = async (bbkit) => {
  const { values: prs } = await bbkit.pullRequests.getAll();

  const calls = prs.map(async pr => getFullPr(pr, bbkit));

  return Promise.all(calls);
};
