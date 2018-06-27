require('dotenv').config();
require('isomorphic-fetch');
const path = require('path');
const app = require('express')();
const bodyParser = require('body-parser');
const AirbrakeClient = require('airbrake-js');
const makeErrorHandler = require('airbrake-js/dist/instrumentation/express');
const SlackBot = require('slackbots');
const reqDir = require('require-dir');
const mongoose = require('mongoose');

const bbkit = require('./bbkit');
const Bot = require('./bot/core/Bot');
const prReminder = require('./bot/prReminder');
const scrumReminder = require('./bot/scrumReminder');
const initReport = require('./bot/initReport');
const formatPr = require('./scm/formatPr');
const getFullPr = require('./scm/getFullPr');

const mw = reqDir('./bot/middlewares');


const PORT = process.env.PORT || 3000;

// Init Slackbot
const slackbot = new SlackBot({
  token: process.env.SLACK_BOT_TOKEN,
  name: 'Testy McTest',
});

// Init mongoose
mongoose.connect(process.env.MONGODB_URI);

// Init Airbrake
const airbrake = new AirbrakeClient({
  projectId: process.env.AIRBRAKE_PROJECT_ID,
  projectKey: process.env.AIRBRAKE_API_KEY,
});

// Init GeorgeMcBot
const bot = new Bot(slackbot, bbkit, [
  mw.guard,
  mw.hello,
  mw.prReport,
  mw.wit,
  mw.sickDay,
  mw.pingPong,
  mw.benderSpeech,
]);


slackbot.on('start', () => {
  prReminder(bbkit, bot);
  scrumReminder(bbkit, bot);
  initReport(bot);
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

  // eslint-disable-next-line no-console
  console.log('INCOMING GITHUB WEBHOOK', body.action);

  if (body.action === 'opened' && pr) {
    getFullPr(pr, bbkit).then((fullPr) => {
      bot.postToReview(formatPr(fullPr, { prefix: data => `New PR opened by ${data.user.login}:` }));
    });
  }

  res.send();
});

// app.get('/auth', (req, res) => {
//   restClient({
//     handleResponse: call => call.then(r => r.text()),
//   }).post(`https://bitbucket.org/site/oauth2/authorize?client_id=${process.env.BITBUCKET_KEY}&response_type=code`).then((r) => {
//     res.send(r);
//   });
// });

app.get('*', (req, res) => res.send('Hello'));

app.use(makeErrorHandler(airbrake));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Spark listening on port ${PORT}!`);
});
