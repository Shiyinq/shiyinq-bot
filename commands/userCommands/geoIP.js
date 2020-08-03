const axios = require('axios')
const command = 'gip'

module.exports = (bot) => {
  bot.command(command, (ctx) => {
    let param = ctx.message.text.split(' ')
    let ip = param[1]
    let baseURL = 'http://ip-api.com'

    axios.get(`${baseURL}${ip ? '/json/' + ip : '/json'}`)
      .then(({ data }) => {
        let obj = JSON.stringify(data, undefined, 2)
        ctx.replyWithHTML(`<b>${ip ? 'IP: ' + ip : 'Your IP: ' + data.query}\n\n </b><code>${obj}</code>\n\nSumber: ip-api.com`)
      })
      .catch(error => {
        console.log(error)
        ctx.reply('Sepertinya ada gangguan, coba lagi lain kali')
      })
  })
}
