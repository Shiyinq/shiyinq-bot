module.exports = (bot) => {
  bot.on('sticker', (ctx) => {
    ctx.reply('👍')
    ctx.reply('Stikernya bagus')
  })
}
