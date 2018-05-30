module.exports = (data, bot) => {
  if (data.text === 'ping') {
    return bot.postTo(data.channel, 'pong');
  }

  if (data.text === 'type') {
    return bot.typeAndPost(data.channel, 'typed');
  }

  return false;
};
