const axios = require('axios')
const command = 'gip'

module.exports = (bot) => {
  bot.command(command, (ctx) => {
    let param = ctx.message.text.split(' ')
    let ip = param[1]
    let baseURL = 'http://ip-api.com/json'

    if (!ip) {
      ctx.reply('Silahkan masukan ip setelah command\n\nContoh: /dnslookup 64.233.160.0')
    } else {
      axios.get(`${baseURL}/${ip}`)
        .then(({ data }) => {
          let obj = JSON.stringify(data, undefined, 2)
          ctx.replyWithHTML(`<b>IP: ${ip}\n\n </b><code>${obj}</code>\n\nSumber: ip-api.com`)
        })
        .catch(error => {
          console.log(error)
          ctx.reply('Sepertinya ada gangguan, coba lagi lain kali')
        })
    }
  })
}
