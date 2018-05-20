const { CONFIG } = require('./constants');


const patterns = [
  ['i’m', 'i am'],
  ['feeling', 'not feeling'],
  ['sick', 'well'],
  ['sick day', 'day off', 'stay home', 'rest'],
];


const isSickDayMessage = (message) => {
  const msg = message.text.toLowerCase();
  const matchScore = patterns.reduce((score, block) => {
    const match = block.find(string => msg.includes(string));
    return match ? score + 1 : score;
  }, 0);

  return matchScore >= patterns.length - 1;
};


module.exports = (message, bot) => {
  if (isSickDayMessage(message)) {
    bot.postMessage(message.channel, `<@${message.user}> Take care!`, CONFIG);
  }
};
