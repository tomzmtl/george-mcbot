module.exports = (bot, data, stop) => {
  if ([bot.memberId, 'USLACKBOT'].includes(data.user)) {
    stop();
  }
};
