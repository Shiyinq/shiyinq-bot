const axios = require('axios')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

function searchMovie (ctx, message, page) {
  let search = message.split(' ')
  search.shift()
  search.join('%20')

  return new Promise((resolve, reject) => {
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

        if (totalResults > 10) {
          let lastPage = Math.ceil(totalResults / 10)

          if (page !== 1) {
            idMovie[2].push(Markup.callbackButton('<prev', JSON.stringify({
              'prevMovie': {
                search: message,
                page: page - 1
              }
            })))
          }

          idMovie[2].push(Markup.callbackButton('❌', 'deleteSearchMovie'))

          if (!(page >= lastPage)) {
            idMovie[2].push(Markup.callbackButton('next>', JSON.stringify({
              'nextMovie': {
                search: message,
                page: page + 1
              }
            })))
          }
        } else {
          idMovie[2].push(Markup.callbackButton('❌', 'deleteSearchMovie'))
        }

        const btnDetail = Markup.inlineKeyboard(idMovie)

        resolve({
          movies: movies,
          button: Extra.markup(btnDetail)
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function detailMovie (ctx, idMovie) {
  return new Promise((resolve, reject) => {
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

        resolve(ctx.replyWithPhoto({ url: Poster },
          Extra.load({ caption: infoMovie })
            .markdown()
            .markup((m) =>
              m.inlineKeyboard([
                m.callbackButton('❌', 'deleteDetailMovie')
              ])
            )
        ))
      })
      .catch((err) => {
        reject(err)
      })
  })
}

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
      detailMovie(ctx, idMovie)
        .then((data) => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (data.prevMovie) {
      let { prevMovie: { search, page } } = data
      searchMovie(ctx, search, page)
        .then(({ movies, button }) => {
          ctx.editMessageText(movies, button)
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (data.nextMovie) {
      let { nextMovie: { search, page } } = data
      searchMovie(ctx, search, page)
        .then(({ movies, button }) => {
          ctx.editMessageText(movies, button)
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}

module.exports.searchMovie = searchMovie
