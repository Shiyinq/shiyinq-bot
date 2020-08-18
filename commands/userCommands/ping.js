module.exports = (bot) => {
  bot.command('ping', (ctx) => {
    const start = new Date()
    // const ms = start - (ctx.message.date * 1000)
    const s = start / 1000 - ctx.message.date
    ctx.replyWithHTML(`Pong 🏓🏓\n\n<code>⏱ ${s.toFixed(3)} s</code>`)
  })
}
