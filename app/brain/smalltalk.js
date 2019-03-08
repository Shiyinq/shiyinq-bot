const tools = require('../tools')

let resBot = null

module.exports = {
  namaBot: function (msg, bot) {
    resBot = ['Nama saya Bot', 'Saya Bot']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  sapaBot: function (msg, bot) {
    resBot = ['Hi', 'helo', 'hay', 'Halo']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  selamatPagi: function (msg, bot) {
    resBot = ['Selamat pagi juga', 'Pagi gan', 'Pagee']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  selamatSiang: function (msg, bot) {
    resBot = ['Selamat siang juga', 'Siang', 'Siyang']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  selamatSore: function (msg, bot) {
    resBot = ['Selamat sore juga', 'sore', 'soree']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  selamatMalam: function (msg, bot) {
    resBot = ['Selamat malam juga', 'malam', 'malem']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  }
}
