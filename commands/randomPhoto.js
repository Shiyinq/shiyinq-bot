const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

module.exports = (bot) => {
  bot.command('rphoto', (ctx) => {
    let category = ctx.message.text.split(' ')[1]
    let photoURL = null
    photoURL = `https://source.unsplash.com/1600x900/?${category}`

    const keyboard = Markup.inlineKeyboard([
      Markup.urlButton('Srouce', 'https://source.unsplash.com')
    ])

    ctx.reply('Tunggu sebentar yaa, lagi nyari gambarnya..')
    ctx.replyWithPhoto({ url: photoURL }, Extra.markup(keyboard))
  })
}
