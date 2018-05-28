const { humans } = require('../../../.bot.js');
const { buildMessage } = require('../bot/helpers');


const mention = ({ id, login }) => {
  const human = humans.find(h => h.scmId === id);
  if (!human) {
    return login;
  }

  return `<@${human.memberId}>`;
};

module.exports = (pr, options = {}) => {
  let msg = [];

  const basePrefix = `>>> [${pr.head.repo.name}]`;

  if (options.prefix) {
    msg = msg.concat(options.prefix ? `${basePrefix} ${options.prefix}` : basePrefix);
  }

  msg = msg.concat(`*<${pr.html_url}|${pr.title}>*`);

  if (options.reviewers && pr.requested_reviewers.length) {
    msg = msg.concat([
      `Reviewers: ${pr.requested_reviewers.map(user => mention(user)).join(', ')}`,
    ]);
  }

  return buildMessage(msg);
};
