module.exports = (bot) => {
  bot.command('date', (ctx) => {
    let param = ctx.message.text.split(' ')[1]
    let fullNow = Date()
    let now = new Date()
    let date = now.getDate()
    let month = now.getMonth()
    let year = now.getFullYear()
    let hours = now.getHours()
    let minutes = now.getMinutes()

    let sendDate = ''

    if (param === 'tanggal') {
      sendDate += `Sekarang tanggal: ${date}-${month.toString().length === 1 ? '0' + (month + 1) : month}-${year}`
    } else if (param === 'jam') {
      sendDate += `Sekarang jam: ${hours.toString().length === 1 ? '0' + hours : hours}:${minutes}`
    } else {
      sendDate += fullNow
    }

    ctx.reply(sendDate)
  })
}
