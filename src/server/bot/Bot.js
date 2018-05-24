const CONFIG = require('../../../.bot.js');
const { buildMessage } = require('./helpers');


module.exports = (slackbot) => {
  const config = {
    as_user: process.env.AS_USER === 'true',
  };

  const postMessage = (channel, msg) => {
    const message = Array.isArray(msg) ? buildMessage(msg) : msg;
    slackbot.postMessage(channel, message, config);
  };

  const postTo = (channel, msg) => postMessage(channel, msg);
  const type = channel => slackbot.ws.send(JSON.stringify({ type: 'typing', channel }));

  return {
    memberId: CONFIG.bot.memberId,
    postToReview: msg => postMessage(process.env.CODE_REVIEW_CHANNEL_ID, msg),
    postToTeam: msg => postMessage(process.env.TEAM_CHANNEL_ID, msg),
    postToSandbox: msg => postMessage(process.env.SANDBOX_CHANNEL_ID, msg),
    postTo,
    type,
    typeAndPost: (channel, msg) => {
      type(channel);
      setTimeout(() => postTo(channel, msg), 1000);
    },
  };
};
