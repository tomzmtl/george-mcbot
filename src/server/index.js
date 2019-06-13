require('dotenv').config();
require('isomorphic-fetch');
const app = require('express')();
const bodyParser = require('body-parser');
const AirbrakeClient = require('airbrake-js');
const makeErrorHandler = require('airbrake-js/dist/instrumentation/express');
const SlackBot = require('slackbots');
const reqDir = require('require-dir');
const mongoose = require('mongoose');
const moment = require('moment');
const bbkit = require('./bbkit');
const Bot = require('./bot/core/Bot');
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
  mw.sickDay,
  mw.pingPong,
  mw.benderSpeech,
]);

slackbot.on('message', (data) => {
  bot.start(data);
});

app.use(bodyParser.json());

app.post('/hooks', (req, res) => {
  const { body } = req;
  // const pr = body.pull_request;

  // eslint-disable-next-line no-console
  console.log('INCOMING WEBHOOK', body.pullrequest.reviewers);

  if (body.pullrequest) {
    // PR approved
    if (body.approval) {
      getFullPr(body.pullrequest, bbkit).then((fullPr) => {
        bot.postToReview(formatPr(fullPr, { prefix: () => `${body.approval.user.display_name} approved a PR:` }));
      });

      return res.send();
    }

    // Add PR comment
    if (body.comment) {
      getFullPr(body.pullrequest, bbkit).then((fullPr) => {
        bot.postToReview(formatPr(fullPr, { prefix: () => `${body.comment.user.display_name} added a comment:` }));
      });

      return res.send();
    }

    // Open PR
    if (body.pullrequest.state === 'OPEN') {
      // New PR
      if (moment(body.pullrequest.created_on).isSame(moment(body.pullrequest.updated_on), 'm')) {
        getFullPr(body.pullrequest, bbkit).then((fullPr) => {
          bot.postToReview(formatPr(fullPr, { prefix: pr => `New PR opened by ${pr.author.display_name}:` }));
        });

        return res.send();
      }

      getFullPr(body.pullrequest, bbkit).then((fullPr) => {
        bot.postToReview(formatPr(fullPr, { prefix: pr => `${pr.author.display_name} updated a PR:` }));
      });

      return res.send();
    }
  }

  return res.send();
});

app.get('*', (req, res) => res.send('Hello'));

app.use(makeErrorHandler(airbrake));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Spark listening on port ${PORT}!`);
});
