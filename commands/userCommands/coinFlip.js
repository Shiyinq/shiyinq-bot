module.exports = (bot) => {
  bot.command('coinflip', (ctx) => {
    let random = (Math.floor(Math.random() * Math.floor(2)))
    let coin = random === 0 ? '💿' : '📀'

    ctx.reply(coin)
  })
}
