const axios = require('axios')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

module.exports = (bot) => {
  bot.command('movie', (ctx) => {
    let search = ctx.message.text.split(' ')
    search.shift()
    search.join('%20')
    let page = 1

    axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDDB_API_KEY}&s=${search}&page=${page}`)
      .then(({ data }) => {
        let { Search, totalResults } = data
        let movies = ''
        let idMovie = [[], [], []]

        Search.forEach((mv, i) => {
          movies += `${i + 1}. ${mv.Title} - ${mv.Year}\n`
          let callbackQuery = JSON.stringify({
            'detailMovie': {
              'idMovie': mv.imdbID
            }
          })

          if (i <= 4) {
            idMovie[0].push(Markup.callbackButton(i + 1, callbackQuery))
          } else {
            idMovie[1].push(Markup.callbackButton(i + 1, callbackQuery))
          }
        })

        // if (totalResults > 10) {
        //   let lastPage = Math.ceil(totalResults / 10)

        //   if (page !== 1) {
        //     idMovie[2].push(Markup.callbackButton('<prev', 'prevMovie'))
        //   }

        //   idMovie[2].push(Markup.callbackButton('❌', 'deleteSearchMovie'))

        //   if (!(page >= lastPage)) {
        //     idMovie[2].push(Markup.callbackButton('next>', 'nextMovie'))
        //   }
        // } else {
        //   idMovie[2].push(Markup.callbackButton('❌', 'deleteSearchMovie'))
        // }

        const btnDetail = Markup.inlineKeyboard(idMovie)

        ctx.reply(movies, Extra.markup(btnDetail))
      })
      .catch(() => {
        ctx.reply('Maaf lagi ada kendala, silahkan coba lagi nanti')
      })
  })

  bot.action('deleteSearchMovie', ({ deleteMessage }) => deleteMessage())
  bot.action('deleteDetailMovie', ({ deleteMessage }) => deleteMessage())

  bot.on('callback_query', (ctx) => {
    let data = JSON.parse(ctx.callbackQuery.data)

    if (data.detailMovie) {
      let { detailMovie: { idMovie } } = data
      ctx.getChat(chatId => {
        console.log(chatId)
      })
      axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDDB_API_KEY}&i=${idMovie}&plot=short`)
        .then(({ data }) => {
          let {
            Title,
            Year,
            Rated,
            Released,
            Runtime,
            Genre,
            Director,
            Writer,
            Actors,
            Plot,
            Language,
            Country,
            Awards,
            Poster,
            imdbRating } = data

          let infoMovie = `Title : ${Title}\nYear : ${Year}\nRated : ${Rated}\nReleased : ${Released}\nRuntime : ${Runtime}\nGenre : ${Genre}\nDirector : ${Director}\nWriter : ${Writer}\nActors : ${Actors}\nPlot : ${Plot}\nLanguage : ${Language}\nCountry : ${Country}\nAwards : ${Awards}\nimdbRating : ${imdbRating}`

          // const btnDelete = Markup.inlineKeyboard([
          //   Markup.callbackButton('❌', 'deleteDetailMovie')
          // ])

          ctx.replyWithPhoto({ url: Poster }, { caption: infoMovie })
          // ctx.reply('aa', Extra.markup(btnDelete))
        })
        .catch(() => {
          ctx.reply('Maaf lagi ada kendala, silahkan coba lagi nanti')
        })
    }
  })
}
