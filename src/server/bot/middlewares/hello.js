module.exports = (bot, data, stop) => {
  if (data.type === 'hello') {
    bot.postToSandbox('`ready.to.kill.all.humans`');
    stop();
  }
};
