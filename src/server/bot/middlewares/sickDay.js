const isSickDayMessage = (message) => {
  const patterns = [
    ['i’m', 'i am'],
    ['feeling', 'not feeling'],
    ['sick', 'well'],
    ['sick day', 'day off', 'stay home', 'rest'],
  ];

  const msg = message.toLowerCase();
  const matchScore = patterns.reduce((score, block) => {
    const match = block.find(string => msg.includes(string));
    return match ? score + 1 : score;
  }, 0);

  return matchScore >= patterns.length - 1;
};

module.exports = (bot, data, stop) => {
  if (data.type !== 'message') {
    return;
  }

  if (data.channel === process.env.TEAM_CHANNEL_ID) {
    if (isSickDayMessage(data.text)) {
      bot.postMessage(data.channel, `<@${data.user}> Take care!`);
      stop();
    }
  }
};
