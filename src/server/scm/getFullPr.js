module.exports = async (pr, bbkit) => {
  const getFullPr = () => bbkit.pullRequests.get(pr.id, pr.source.repository.name);

  const fullPr = await getFullPr(pr, bbkit);

  return fullPr;
};
