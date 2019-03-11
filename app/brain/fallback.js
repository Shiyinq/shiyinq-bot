const tools = require('../tools')

class Fallback {
  constructor () {
    this.resBot = null
  }
  responDefault (msg, bot) {
    this.resBot = ['😥 Maaf saya tidak mengerti ka..', 'Maksudnya apa ka ? 🤔', 'Aku gak mudeng ka 🙄', 'Hmmm 🤔', 'Bingung saya 😵', 'Gak ngerti aku..😓', 'Ngomong apa sih ka ? 🙄']
    this.resBot = tools.responseVarian(this.resBot)
    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
  errorMessage (msg, bot) {
    this.resBot = 'Maaf terjadi kesahalan'
    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
}

const fallback = new Fallback()
module.exports = fallback
