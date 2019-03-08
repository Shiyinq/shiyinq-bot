let resBot = null
module.exports = {
  responDefault: function (msg, bot) {
    resBot = ['😥 Maaf saya tidak mengerti ka..', 'Maksudnya apa ka ? 🤔', 'Aku gak mudeng ka 🙄', 'Hmmm 🤔', 'Bingung saya 😵', 'Gak ngerti aku..😓', 'Ngomong apa sih ka ? 🙄']
    let getRandomResponse = resBot[Math.floor(Math.random() * resBot.length)]
    bot.sendMessage(msg.chat.id, getRandomResponse, { reply_to_message_id: msg.message_id })
  },
  errorMessage: function (msg, bot) {
    resBot = 'Maaf terjadi kesahalan'
    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  }
}
