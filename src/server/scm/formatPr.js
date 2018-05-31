const { humans } = require('../../../.bot.js');
const { buildMessage } = require('../bot/helpers');


const mention = (login) => {
  const human = humans.find(h => h.scmId === login);
  if (!human) {
    return login;
  }

  return `<@${human.memberId}>`;
};

const renderIcon = (pr, meta) => {
  if (meta.rejected) {
    return ':poop:';
  }

  if (meta.approved || meta.story) {
    return ':thumbsup:';
  }

  return ':package:';
};

const renderCollaborators = (pr, meta) => {
  if (meta.pending && !meta.story) {
    return `Reviewers: ${pr.requested_reviewers.map(user => mention(user.login)).join(', ')}`;
  }

  if (meta.approved || meta.story) {
    return `Owner: ${mention(pr.user.login)}`;
  }

  return null;
};

module.exports = (pr) => {
  const approved = pr.reviews.some(review => review.state === 'APPROVED');
  const rejected = pr.reviews.some(review => review.state === 'REQUEST_CHANGES');

  const meta = {
    approved,
    pending: !approved && !rejected,
    rejected,
    story: pr.labels.some(label => label.name === 'Story'),
  };

  const msg = [
    `${renderIcon(pr, meta)} *<${pr.html_url}|${pr.title}>*`,
    renderCollaborators(pr, meta),
  ];

  return buildMessage(msg);
};
