module.exports = (bot, tg, axios) => {
  bot.command('urlshort', (ctx) => {
    let param = ctx.message.text.split(' ')[1]
    let baseUrl = 'https://rel.ink/'
    if (param) {
      let expression = /[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)?/gi
      let regex = new RegExp(expression)
      let t = param

      if (t.match(regex)) {
        axios.post(`${baseUrl}api/links/`, { url: param })
          .then(({ data: { hashid } }) => {
            ctx.reply(`${baseUrl}${hashid}`)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        ctx.reply('Bukan url yang dimasukan')
      }
    } else {
      ctx.reply('Masukan url yang akan di perpendek')
    }
  })
}
