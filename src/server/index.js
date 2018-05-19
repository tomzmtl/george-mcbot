require('dotenv').config();

const app = require('express')();
const SlackBot = require('slackbots');
const octokit = require('@octokit/rest')();

const setupPrReminder = require('./bot/setupPrReminder');


// Init Slackbot
const bot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  name: 'Golo Bot',
});

// Init Github
octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN,
});


bot.on('start', () => {
  setupPrReminder(octokit, bot);
});

bot.on('message', (data) => {
  console.log(100, data);

  if (data.text === 'ping') {
    bot.postMessageToGroup(process.env.CODE_REVIEW_CHANNEL, 'pong');
  }
});


app.get('*', (req, res) => res.send('Hello'));


app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('Spark listening on port 3000!');
});
