module.exports = (bot) => {
  bot.command('number', (ctx) => {
    let param = ctx.message.text.split(' ')[1]
    let length = param || 10
    let number = Math.floor(Math.random() * length) + 1

    ctx.reply(`Kamu dapat nomer : ${number}`)
  })
}
