module.exports = (bot) => {
  bot.command('/dbg', (ctx) => {
    const start = new Date()
    const ms = new Date() - start
    let dbg = JSON.stringify(ctx.update, undefined, 2)
    ctx.replyWithHTML(`<b>Debug messages</b>\n<code>${dbg}\n\n⏱ ${ms} s</code>`)
  })
}
