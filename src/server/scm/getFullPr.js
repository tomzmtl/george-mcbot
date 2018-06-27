module.exports = async (pr, bbkit) => {
  const getFullPr = id => bbkit.pullRequests.get(id);

  const fullPr = await getFullPr(pr.id, bbkit);

  return fullPr;
};
