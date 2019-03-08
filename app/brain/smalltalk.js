let resBot = null

module.exports = {
  namaBot: function (msg, bot) {
    resBot = 'Nama saya BOT'
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  sapaBot: function (msg, bot) {
    resBot = 'Hi'
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  selamatPagi: function (msg, bot) {
    resBot = 'Selamat pagi juga'
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  selamatSiang: function (msg, bot) {
    resBot = 'Selamat siang juga'
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  selamatSore: function (msg, bot) {
    resBot = 'Selamat sore juga'
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  selamatMalam: function (msg, bot) {
    resBot = 'Selamat malam juga'
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  }
}
