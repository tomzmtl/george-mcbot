require('dotenv').config();
const path = require('path');
const app = require('express')();
const bodyParser = require('body-parser');
const AirbrakeClient = require('airbrake-js');
const makeErrorHandler = require('airbrake-js/dist/instrumentation/express');
const SlackBot = require('slackbots');
const octokit = require('@octokit/rest')();
const reqDir = require('require-dir');

const Bot = require('./bot/core/Bot');
const prReminder = require('./bot/prReminder');
const scrumReminder = require('./bot/scrumReminder');
const formatPr = require('./scm/formatPr');
const getReviews = require('./github/getReviews');

const mw = reqDir('./bot/middlewares');


const PORT = process.env.PORT || 3000;

// Init Slackbot
const slackbot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  name: 'Testy McTest',
});

// Init Octokit
octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN,
});

// Init Airbrake
const airbrake = new AirbrakeClient({
  projectId: process.env.AIRBRAKE_PROJECT_ID,
  projectKey: process.env.AIRBRAKE_API_KEY,
});

// Init GeorgeMcBot
const bot = new Bot(slackbot, octokit, [
  mw.guard,
  mw.hello,
  mw.prReport,
  mw.wit,
  mw.sickDay,
  mw.pingPong,
  mw.benderSpeech,
]);


slackbot.on('start', () => {
  prReminder(octokit, bot);
  scrumReminder(octokit, bot);
});

slackbot.on('message', (data) => {
  bot.start(data);
});

app.use(bodyParser.json());

app.get('/wakemydyno.txt', (req, res) =>
  res.sendFile(path.join(__dirname, 'static/wakemydyno.txt')));

app.post('/hooks', (req, res) => {
  const { body } = req;
  const pr = body.pull_request;

  if (body.action === 'opened' && pr) {
    getReviews(pr, octokit).then((fullPr) => {
      bot.postToReview(formatPr(fullPr, { prefix: data => `New PR opened by ${data.user.login}:` }));
    });
  }

  res.send();
});

app.get('*', (req, res) => res.send('Hello'));

app.use(makeErrorHandler(airbrake));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Spark listening on port ${PORT}!`);
});
