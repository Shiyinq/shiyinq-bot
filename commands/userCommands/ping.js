module.exports = (bot) => {
  bot.command('ping', (ctx) => {
    const start = new Date()
    const ms = new Date() - start
    ctx.replyWithHTML(`Pong 🏓🏓\n\n<code>⏱ ${ms} s</code>`)
  })
}
