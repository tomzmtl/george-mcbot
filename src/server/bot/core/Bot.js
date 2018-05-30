const CONFIG = require('../../../../.bot.js');
const { buildMessage } = require('../helpers');


class Bot {
  constructor(bot, middlewares) {
    this.bot = bot;
    this.middlewares = middlewares;
    this.config = {
      as_user: process.env.AS_USER === 'true',
    };
    this.memberId = CONFIG.bot.memberId;
  }

  postMessage(channel, msg) {
    const message = Array.isArray(msg) ? buildMessage(msg) : msg;
    this.bot.postMessage(channel, message, this.config);
  }

  type(channel) {
    this.bot.ws.send(JSON.stringify({ type: 'typing', channel }));
  }

  start(data) {
    let stopped = false;

    const stop = () => { stopped = true; };

    for (let i = 0; i < this.middlewares.length; i += 1) {
      if (stopped) {
        return;
      }

      this.middlewares[i](this, data, stop);
    }
  }

  postToReview(msg) {
    this.postMessage(process.env.CODE_REVIEW_CHANNEL_ID, msg);
  }

  postToTeam(msg) {
    this.postMessage(process.env.TEAM_CHANNEL_ID, msg);
  }

  postToSandbox(msg) {
    this.postMessage(process.env.SANDBOX_CHANNEL_ID, msg);
  }

  typeAndPost(channel, msg) {
    this.type(channel);
    setTimeout(() => this.postMEssage(channel, msg), 1000);
  }
}

module.exports = Bot;
