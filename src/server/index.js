require('dotenv').config();
const path = require('path');
const app = require('express')();
const SlackBot = require('slackbots');
const octokit = require('@octokit/rest')();

const prReminder = require('./bot/prReminder');
const scrumReminder = require('./bot/scrumReminder');
const sickDayMessage = require('./bot/sickDayMessage');
const pingPong = require('./bot/pingPong');
const benderSpeech = require('./bot/benderSpeech');


const PORT = process.env.PORT || 3000;

// Init Slackbot
const bot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  name: 'Testy McTest',
});

// Init Github
octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN,
});


bot.on('start', () => {
  prReminder(octokit, bot);
  scrumReminder(octokit, bot);
});

bot.on('message', (data) => {
  console.log(100, data);
  if (data.type === 'message') {
    pingPong(data, bot);
    if (process.env.MAIN_CHANNEL_ID) {
      benderSpeech(data, bot);
      sickDayMessage(data, bot);
    }
  }
});


app.get('/wakemydyno.txt', (req, res) =>
  res.sendFile(path.join(__dirname, 'static/wakemydyno.txt')));

app.get('*', (req, res) => res.send('Hello'));


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Spark listening on port ${PORT}!`);
});
