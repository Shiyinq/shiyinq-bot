const axios = require('axios')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

function searchMovie (message, page) {
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

function detailMovie (idMovie) {
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

        resolve({
          poster: Poster,
          caption: infoMovie
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = (bot) => {
  bot.command('movie', (ctx) => {
    if (ctx.message.text.split(' ')[1]) {
      searchMovie(ctx.message.text, 1)
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

module.exports.searchMovie = searchMovie
module.exports.detailMovie = detailMovie
