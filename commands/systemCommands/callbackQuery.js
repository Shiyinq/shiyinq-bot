const { detailMovie, searchMovie } = require('../userCommands/movie')
const Extra = require('telegraf/extra')

module.exports = (bot) => {
  bot.action('deleteNews', ({ deleteMessage }) => {
    deleteMessage().then(res => console.log(res)).catch(err => console.log(err))
  })

  bot.action('deleteSearchMovie', ({ deleteMessage }) => {
    deleteMessage().then(res => console.log(res)).catch(err => console.log(err))
  })

  bot.action('deleteDetailMovie', ({ deleteMessage }) => {
    deleteMessage().then(res => console.log(res)).catch(err => console.log(err))
  })

  bot.on('callback_query', (ctx) => {
    let data = JSON.parse(ctx.callbackQuery.data)

    if (data.detailMovie) {
      let { detailMovie: { idMovie } } = data
      detailMovie(idMovie)
        .then(({ poster, caption }) => {
          ctx.replyWithPhoto({ url: poster },
            Extra.load({ caption: caption })
              .markdown()
              .markup((m) =>
                m.inlineKeyboard([
                  m.callbackButton('❌', 'deleteDetailMovie')
                ])
              )
          )
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (data.prevMovie) {
      let { prevMovie: { search, page } } = data
      searchMovie(search, page)
        .then(({ movies, button }) => {
          ctx.editMessageText(movies, button)
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (data.nextMovie) {
      let { nextMovie: { search, page } } = data
      searchMovie(search, page)
        .then(({ movies, button }) => {
          ctx.editMessageText(movies, button)
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}
