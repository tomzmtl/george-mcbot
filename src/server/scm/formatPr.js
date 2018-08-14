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
  if (pr.reviewers.length && meta.pending && !meta.story) {
    return `> Reviewers: ${pr.reviewers.map(user => mention(user.username)).join(', ')}`;
  }

  if (meta.approved || meta.story) {
    return `> Owner: ${mention(pr.author.username)}`;
  }

  return null;
};

module.exports = (pr, options = {}) => {
  const approved = pr.participants.some(user => user.approved);
  const rejected = false; // TODO: wait for bitbucket to allow "request changes" status

  const meta = {
    approved,
    pending: !approved && !rejected,
    rejected,
    story: false, // TODO: wait for bitbucket to allow labels :facepalm:
  };

  const msg = options.prefix ? [options.prefix(pr)] : [];

  return buildMessage(msg.concat([
    `${renderIcon(pr, meta)} *<${pr.links.html.href}|${pr.title}>* \`${pr.source.repository.name}\``,
    renderCollaborators(pr, meta),
  ]));
};
