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
  let msg = [
    `>>> [${pr.head.repo.name}]`,
    `*<${pr.html_url}|${pr.title}>*`,
  ];

  if (options.reviewers && pr.requested_reviewers.length) {
    msg = msg.concat([
      `Reviewers: ${pr.requested_reviewers.map(user => mention(user)).join(', ')}`,
    ]);
  }

  return buildMessage(msg);
};
