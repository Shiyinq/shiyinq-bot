module.exports = (bot) => {
  bot.on('new_chat_members', (ctx) => {
    let username = ctx.message.new_chat_member.first_name
    ctx.reply(`Hai ${username}, Selamat datang di group`)
  })
}
