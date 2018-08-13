require('dotenv').config();
require('isomorphic-fetch');
const moment = require('moment');
const SlackBot = require('slackbots');
const bbkit = require('../bbkit');
const Bot = require('../bot/core/Bot');
const prReport = require('../bot/prReport');

// do not execute on weekends
const now = moment();
if ([0, 6].includes(now.day())) {
  process.exit();
}

// Init Slackbot
const slackbot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  name: 'Testy McTest',
});

const bot = new Bot(slackbot, bbkit);

prReport(bbkit, bot).then(() => { process.exit(); });
