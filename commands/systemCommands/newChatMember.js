module.exports = (bot) => {
  bot.on('new_chat_members', (ctx) => {
    let newChatMembers = ctx.message.new_chat_members
    newChatMembers.forEach(u => {
      ctx.reply(`Hai ${u.first_name}, Selamat datang di group`)
    })
  })
}
