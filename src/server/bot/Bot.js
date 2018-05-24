const { CONFIG } = require('./constants');
const { buildMessage } = require('./helpers');


const bot = slackbot => ({
  postToReview: (msg) => {
    const message = Array.isArray(msg) ? buildMessage(msg) : msg;
    slackbot.postMessage(process.env.CODE_REVIEW_CHANNEL_ID, message, CONFIG);
  },
  postToTeam: (msg) => {
    const message = Array.isArray(msg) ? buildMessage(msg) : msg;
    slackbot.postMessage(process.env.MAIN_CHANNEL_ID, message, CONFIG);
  },
});

module.exports = bot;
