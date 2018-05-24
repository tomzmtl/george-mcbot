module.exports = (data, bot) => {
  if (data.text.toLowerCase().includes('congrats people')) {
    const msg = 'Oh my god. I\'m so excited I wish I could wet my pants!';
    bot.postTo(data.channel, msg);
  }
};
