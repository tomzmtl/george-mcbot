require('dotenv').config();
require('isomorphic-fetch');
const SlackBot = require('slackbots');
const bbkit = require('../bbkit');
const Bot = require('../bot/core/Bot');
const prReport = require('../bot/prReport');

// Init Slackbot
const slackbot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  name: 'Testy McTest',
});

const bot = new Bot(slackbot, bbkit);

prReport(bbkit, bot).then(() => { process.exit(); });
