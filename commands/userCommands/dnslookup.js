const axios = require('axios')
const command = 'dnslookup'

module.exports = (bot) => {
  bot.command(command, (ctx) => {
    let param = ctx.message.text.split(' ')
    let dns = param[1]
    let baseURL = 'https://api.banghasan.com'

    if (!dns) {
      ctx.reply('Silahkan masukan DNS setelah command\n\nContoh: /dnslookup github.com')
    } else {
      axios.get(`${baseURL}/domain/dnslookup/${dns}`)
        .then(({ data: { query, hasil } }) => {
          ctx.replyWithHTML(`DNS: ${query}\n\n${hasil}`)
        })
        .catch(error => {
          console.log(error)
          ctx.reply('Sepertinya ada gangguan, coba lagi lain kali')
        })
    }
  })
}
