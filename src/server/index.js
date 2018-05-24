require('dotenv').config();
const path = require('path');
const app = require('express')();
const AirbrakeClient = require('airbrake-js');
const makeErrorHandler = require('airbrake-js/dist/instrumentation/express');
const SlackBot = require('slackbots');
const octokit = require('@octokit/rest')();
const { Wit } = require('node-wit');

const Bot = require('./bot/Bot');
const prReminder = require('./bot/prReminder');
const scrumReminder = require('./bot/scrumReminder');
const handleMessage = require('./bot/handleMessage');


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

// Init Airbrake
const airbrake = new AirbrakeClient({
  projectId: process.env.AIRBRAKE_PROJECT_ID,
  projectKey: process.env.AIRBRAKE_API_KEY,
});

// Init Wit
const wit = new Wit({
  accessToken: process.env.WIT_TOKEN,
});


slackbot.on('start', () => {
  prReminder(octokit, bot);
  scrumReminder(octokit, bot);
});

slackbot.on('message', (data) => {
  if (!bot.memberId === data.user) {
    return;
  }

  if (data.type === 'hello') {
    bot.postToSandbox('`ready.to.kill.all.humans!`');
    return;
  }

  if (data.type === 'message') {
    wit.message(data.text);
    handleMessage(data, bot, octokit);
  }
});


app.get('/wakemydyno.txt', (req, res) =>
  res.sendFile(path.join(__dirname, 'static/wakemydyno.txt')));

app.get('*', (req, res) => res.send('Hello'));

app.use(makeErrorHandler(airbrake));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Spark listening on port ${PORT}!`);
});
