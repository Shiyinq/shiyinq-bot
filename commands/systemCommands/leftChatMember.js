module.exports = (bot) => {
  bot.on('left_chat_member', (ctx) => {
    let username = ctx.message.left_chat_member.first_name
    ctx.reply(`Selamat tinggal ${username} aku akan merindukan kamu`)
  })
}
