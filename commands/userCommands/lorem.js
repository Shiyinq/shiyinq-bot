module.exports = (bot) => {
  bot.command('lorem', (ctx) => {
    let lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque ratione nesciunt quibusdam temporibus commodi? Dicta impedit debitis cupiditate, sint harum quo reiciendis corporis cum nemo sit eum voluptates maiores placeat.'

    ctx.reply(lorem)
  })
}
