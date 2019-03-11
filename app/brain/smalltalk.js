const tools = require('../tools')

class Smalltalk {
  constructor () {
    this.resBot = null
  }
  namaBot (msg, bot) {
    this.resBot = ['Nama saya Bot', 'Saya Bot']
    this.resBot = tools.responseVarian(this.resBot)
    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
  sapaBot (msg, bot) {
    this.resBot = ['Hi', 'helo', 'hay', 'Halo']
    this.resBot = tools.responseVarian(this.resBot)
    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
  selamatPagi (msg, bot) {
    this.resBot = ['Selamat pagi juga', 'Pagi gan', 'Pagee']
    this.resBot = tools.responseVarian(this.resBot)
    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
  selamatSiang (msg, bot) {
    this.resBot = ['Selamat siang juga', 'Siang', 'Siyang']
    this.resBot = tools.responseVarian(this.resBot)
    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
  selamatSore (msg, bot) {
    this.resBot = ['Selamat sore juga', 'sore', 'soree']
    this.resBot = tools.responseVarian(this.resBot)
    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
  selamatMalam (msg, bot) {
    this.resBot = ['Selamat malam juga', 'malam', 'malem']
    this.resBot = tools.responseVarian(this.resBot)
    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
}

const smalltalk = new Smalltalk()
module.exports = smalltalk
