module.exports = (bot) => {
  bot.command('unpin', (ctx) => {
    ctx.getChat().then(({ type }) => {
      if (type !== 'private') {
        let messageId = ctx.message.message_id
        ctx.unpinChatMessage()
          .then(() => {
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
      }
    })
  })
}
