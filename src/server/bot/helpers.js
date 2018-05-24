const buildMessage = chunks => chunks.join('\r');

const random = array => array[Math.floor(Math.random() * array.length)];


module.exports = {
  buildMessage,
  random,
};
