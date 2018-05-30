module.exports = (bot, data) => {
  if (data.type !== 'message') {
    return;
  }

  if (data.channel === process.env.TEAM_CHANNEL_ID) {
    if (data.text.toLowerCase().includes('congrats people')) {
      const msg = 'Oh my god. I\'m so excited I wish I could wet my pants!';
      bot.postMessage(data.channel, msg);
    }
  }
};
