module.exports = (bot) => {
  bot.command('/dbg', (ctx) => {
    const start = new Date()
    // const ms = start - (ctx.message.date * 1000)
    const s = start / 1000 - ctx.message.date
    let dbg = JSON.stringify(ctx.update, undefined, 2)
    ctx.replyWithHTML(`<b>Debug messages</b>\n<code>${dbg}\n\n⏱ ${s.toFixed(3)} s</code>`)
  })
}
