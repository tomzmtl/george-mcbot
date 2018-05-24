require('dotenv').config();
const path = require('path');
const app = require('express')();
const SlackBot = require('slackbots');
const octokit = require('@octokit/rest')();

const Bot = require('./bot/Bot');
const prReminder = require('./bot/prReminder');
const scrumReminder = require('./bot/scrumReminder');
const sickDayMessage = require('./bot/sickDayMessage');
const pingPong = require('./bot/pingPong');
const benderSpeech = require('./bot/benderSpeech');


const PORT = process.env.PORT || 3000;

// Init Slackbot
const slackbot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  name: 'Testy McTest',
});

const bot = Bot(slackbot);

// Init Github
octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN,
});


slackbot.on('start', () => {
  prReminder(octokit, bot);
  scrumReminder(octokit, bot);
});

slackbot.on('message', (data) => {
  // console.log(100, data);
  if (data.type === 'message') {
    pingPong(data, slackbot);
    if (process.env.MAIN_CHANNEL_ID) {
      benderSpeech(data, slackbot);
      sickDayMessage(data, slackbot);
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
