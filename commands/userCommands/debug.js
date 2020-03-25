module.exports = (bot) => {
  bot.command('/dbg', (ctx) => {
    let dbg = JSON.stringify(ctx.update, undefined, 2)
    ctx.replyWithHTML(`<b>Debug messages</b>\n<code>${dbg}</code>`)
  })
}
