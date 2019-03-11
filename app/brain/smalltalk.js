const tools = require('../tools')

let resBot = null

class Smalltalk {
  namaBot (msg, bot) {
    resBot = ['Nama saya Bot', 'Saya Bot']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  }
  sapaBot (msg, bot) {
    resBot = ['Hi', 'helo', 'hay', 'Halo']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  }
  selamatPagi (msg, bot) {
    resBot = ['Selamat pagi juga', 'Pagi gan', 'Pagee']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  }
  selamatSiang (msg, bot) {
    resBot = ['Selamat siang juga', 'Siang', 'Siyang']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  }
  selamatSore (msg, bot) {
    resBot = ['Selamat sore juga', 'sore', 'soree']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  }
  selamatMalam (msg, bot) {
    resBot = ['Selamat malam juga', 'malam', 'malem']
    resBot = tools.responseVarian(resBot)
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  }
}

const smalltalk = new Smalltalk()
module.exports = smalltalk
