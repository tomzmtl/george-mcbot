const { CONFIG } = require('./constants');


module.exports = (data, bot) => {
  if (data.text.includes('Congrats people')) {
    const msg = 'Oh my god. I\'m so excited I wish I could wet my pants!';
    bot.postMessage(data.channel, msg, CONFIG);
  }
};
