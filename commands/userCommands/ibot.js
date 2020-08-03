module.exports = (bot, tg) => {
  bot.command('ibot', (ctx) => {
    tg.getMe()
      .then(data => {
        ctx.replyWithHTML(`🤖 About Me\n\n<code>ID: ${data.id}\nI'm: Bot\nName: ${data.first_name}\nUsername: ${data.username}\nCan Join Groups: ${data.can_join_groups ? 'Yes' : 'No'}\nRead All Group Messages: ${data.can_read_all_group_messages ? 'Yes' : 'No'}\nSuport Inline Queries: ${data.supports_inline_queries ? 'Yes' : 'No'}</code>`)
      })
  })
}
