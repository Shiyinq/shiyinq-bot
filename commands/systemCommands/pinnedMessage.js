module.exports = (bot) => [
  bot.on('pinned_message', (ctx) => {
    ctx.reply('Pesan disematkan baru!\nJangan lupa dibaca yaa')
  })
]
