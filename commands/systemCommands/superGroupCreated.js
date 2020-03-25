module.exports = (bot) => {
  bot.on('supergroup_chat_created', (ctx) => {
    ctx.reply('Group ini telah berubah menjadi Super Group')
  })
}
