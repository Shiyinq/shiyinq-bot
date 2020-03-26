module.exports = (bot) => {
  bot.command('date', (ctx) => {
    let param = ctx.message.text.split(' ')[1]
    var local = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    let fullNow = new Date(local).toLocaleString()
    let now = new Date(local)
    let date = now.getDate()
    let month = now.getMonth()
    let year = now.getFullYear()
    let hours = now.getHours()
    let minutes = now.getMinutes()

    let sendDate = ''

    if (param === 'tanggal') {
      sendDate += `Sekarang tanggal: ${date}-${month.toString().length === 1 ? '0' + (month + 1) : month}-${year}`
    } else if (param === 'jam') {
      sendDate += `Sekarang jam: ${hours.toString().length === 1 ? '0' + hours : hours}:${minutes.toString().length === 1 ? '0' + minutes : minutes}`
    } else {
      sendDate += fullNow
    }

    ctx.reply(sendDate)
  })
}
