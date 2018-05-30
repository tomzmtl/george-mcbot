const { Wit } = require('node-wit');


const wit = new Wit({
  accessToken: process.env.WIT_TOKEN,
});

module.exports = (bot, data) => {
  if (data.type === 'message') {
    if (data.text && data.text.length < 256 && data.text.length > 0) {
      wit.message(data.text);
    }
  }
};
