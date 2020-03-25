module.exports = (bot) => {
  bot.command('qrcode', (ctx) => {
    let message = ctx.message.text.split(' ')[1]
    if (message) {
      let urlPhoto = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${message}`
      ctx.reply('Berikut hasilnya')
      ctx.replyWithPhoto(urlPhoto)
    } else {
      ctx.reply('Mohon masukan kalimat yang akan di generate')
    }
  })
}
