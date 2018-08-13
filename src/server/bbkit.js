const { create: restClient } = require('fans-rest');

const bbClient = restClient({
  headers: {
    Authorization: `Basic ${Buffer.from(['thomas-golo', process.env.BITBUCKET_TOKEN].join(':')).toString('base64')}`,
  },
});

module.exports = {
  pullRequests: {
    get: id => bbClient.get(`https://api.bitbucket.org/2.0/repositories/goloinc/ordering-web-app/pullrequests/${id}`),
    getAll: repo =>
      bbClient.get(`https://api.bitbucket.org/2.0/repositories/goloinc/${repo}/pullrequests?q=state="OPEN"`),
  },
};
