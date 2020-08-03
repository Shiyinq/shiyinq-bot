const commands = require('../../commands.json')

module.exports = (bot) => {
  bot.help((ctx) => {
    let param = ctx.message.text.split(' ')[1]
    let text = null

    if (!param) {
      ctx.reply('/help <nama perintah>\n\ncontoh: /help menu')
    } else {
      commands.forEach(cmd => {
        if (param === cmd.name) {
          text = `Help\n\n${cmd.name}\n/${cmd.name} ${cmd.parameter}\n${cmd.description}\n\n Contoh:\n${cmd.example}`
        }
      })
      text == null ? ctx.reply(`Perintah ${param} tidak tersedia`) : ctx.reply(text)
    }
  })
}
