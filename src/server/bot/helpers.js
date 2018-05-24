const buildMessage = chunks => chunks.join('\r');

const random = array => array[Math.floor(Math.random() * array.length)];

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


module.exports = {
  buildMessage,
  isSickDayMessage,
  random,
};
