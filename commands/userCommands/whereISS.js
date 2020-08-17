const command = 'whereiss'

module.exports = (bot, tg, axios) => {
  bot.command(command, (ctx) => {
    ctx.reply('Sedang mencari posisi 🛰 ISS')
    axios.get('https://api.wheretheiss.at/v1/satellites/25544')
      .then(({ data }) => {
        let { longitude, latitude, timestamp } = data

        ctx.replyWithHTML(`<code>latitude: ${latitude}\nlongitude: ${longitude}\n\nTime: ${new Date(timestamp * 1000)} </code>\n\nSumber: wheretheiss.at`)
        ctx.replyWithLocation(latitude, longitude)
      })
      .catch(error => {
        console.log(error)
        ctx.reply('Tidak bisa mencari posisi satelit ISS, coba lagi dilain waktu.')
      })
  })
}
