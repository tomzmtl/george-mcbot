module.exports = (bot, data, stop) => {
  if (data.type !== 'message') {
    return;
  }

  if (data.text === 'ping') {
    bot.postMessage(data.channel, 'pong');
    stop();
  }
};
