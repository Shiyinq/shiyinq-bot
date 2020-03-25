const { searchMovie } = require('../systemCommands/callbackQuery')

module.exports = (bot) => {
  bot.command('movie', (ctx) => {
    if (ctx.message.text.split(' ')[1]) {
      searchMovie(ctx, ctx.message.text, 1)
        .then(({ movies, button }) => {
          ctx.reply(movies, button)
        })
        .catch(() => {
          ctx.reply('Maaf lagi ada kendala, silahkan coba lagi nanti')
        })
    } else {
      ctx.reply('Silahkan masukan judul film yang akan dicari')
    }
  })
}
