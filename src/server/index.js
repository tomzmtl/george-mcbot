require('dotenv').config();
const path = require('path');
const app = require('express')();
const bodyParser = require('body-parser');
const AirbrakeClient = require('airbrake-js');
const makeErrorHandler = require('airbrake-js/dist/instrumentation/express');
const SlackBot = require('slackbots');
const octokit = require('@octokit/rest')();
const { Wit } = require('node-wit');
const reqDir = require('require-dir');

const Bot = require('./bot/Bot');
const Robot = require('./bot/core/Bot');
const prReminder = require('./bot/prReminder');
const scrumReminder = require('./bot/scrumReminder');
const handleMessage = require('./bot/handleMessage');
const formatPr = require('./scm/formatPr');

const mw = reqDir('./bot/middlewares');


const PORT = process.env.PORT || 3000;

// Init Slackbot
const slackbot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  name: 'Testy McTest',
});

const bot = Bot(slackbot);

const George = new Robot(slackbot, octokit, [
  mw.sickDay,
  mw.benderSpeech,
]);

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
  if ([bot.memberId, 'USLACKBOT'].includes(data.user)) {
    return;
  }

  if (data.type === 'hello') {
    bot.postToSandbox('`ready.to.kill.all.humans`');
    return;
  }

  if (data.type === 'message') {
    if (data.text) {
      if (data.text.length < 256 && data.text.length > 0) {
        wit.message(data.text);
      }
      handleMessage(data, bot, octokit);
    }
  }

  George.start(data);
});

app.use(bodyParser.json());

app.get('/wakemydyno.txt', (req, res) =>
  res.sendFile(path.join(__dirname, 'static/wakemydyno.txt')));

app.post('/hooks', (req, res) => {
  const { body } = req;
  const pr = body.pull_request;

  if (body.action === 'opened' && pr) {
    bot.postToReview(formatPr(pr, { prefix: 'New PR:' }));
  }

  res.send();
});

app.get('*', (req, res) => res.send('Hello'));

app.use(makeErrorHandler(airbrake));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Spark listening on port ${PORT}!`);
});
