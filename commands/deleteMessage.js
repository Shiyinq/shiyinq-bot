module.exports = (bot) => {
  bot.command('delete', (ctx) => {
    ctx.getChat().then(({ type }) => {
      if (type !== 'private') {
        if ('reply_to_message' in ctx.message) {
          let messageId = ctx.message.message_id
          let messageIdReply = ctx.message.reply_to_message.message_id

          ctx.deleteMessage(messageIdReply)
            .then((res) => {
              console.log(res)
              ctx.deleteMessage(messageId)
                .then((res) => {
                  console.log(res)
                })
                .catch(({ response }) => {
                  console.log(response)
                })
            })
            .catch(({ response }) => {
              console.log(response)
            })
        } else {
          ctx.reply('Silahkan reply pesan yang akan di hapus')
        }
      }
    })
  })
}
