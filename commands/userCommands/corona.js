const axios = require('axios')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

function corona (msg = 'all') {
  let baseURL = 'https://corona.lmao.ninja/v2/'
  let all = 'all'
  let countries = 'countries'
  return new Promise((resolve, reject) => {
    axios.get(`${baseURL}${msg === 'all' ? all : countries + '/' + (msg === 'rank' ? '' : msg)}`)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
module.exports = (bot) => {
  bot.command('corona', (ctx) => {
    let param = ctx.message.text.split(' ')[1]

    corona(param)
      .then(res => {
        let img = 'https://i.pinimg.com/originals/2c/1b/95/2c1b95f81844de6ee4b1b0ebc6245dc9.png'

        if (param === 'all' || !param) {
          let { cases, deaths, recovered } = res

          ctx.replyWithPhoto({ url: img },
            Extra.load({ caption: '**GLOBAL - Kasus COVID-19 Terbaru**' })
              .markdown()
              .markup((m) =>
                m.inlineKeyboard([
                  [m.callbackButton(`📝 ${cases} Kasus`, 'disableButton')],
                  [m.callbackButton(`⚰ ${deaths} Meninggal`, 'disableButton')],
                  [m.callbackButton(`💪 ${recovered} Sembuh`, 'disableButton')]
                ])
              )
          )
        } else if (param === 'rank') {
          let total = res.length
          let ranks = []

          for (let i = 0; i < 10; i++) {
            ranks.push([Markup.callbackButton(`${i + 1}. ${res[i].country} - ${res[i].cases} Kasus`, 'disableButton')])
          }
          ranks.push([Markup.callbackButton(` Totoal ${total} Negara yang tercatat`, 'disableButton')])

          ctx.replyWithPhoto({ url: img },
            Extra.load({ caption: `**TOP 10 - Kasus COVID-19 Terbaru**` })
              .markdown()
              .markup((m) =>
                m.inlineKeyboard(ranks)
              )
          )
        } else {
          let { countryInfo: { flag }, cases, todayCases, deaths, todayDeaths, recovered } = res
          img = flag

          ctx.replyWithPhoto({ url: img },
            Extra.load({ caption: `**${param.toUpperCase()} - Kasus COVID-19 Terbaru**` })
              .markdown()
              .markup((m) =>
                m.inlineKeyboard([
                  [m.callbackButton(`📝 ${cases} Kasus`, 'disableButton')],
                  [m.callbackButton(`📝 ${todayCases} Kasus Terbaru`, 'disableButton')],
                  [m.callbackButton(`⚰ ${deaths} Meninggal`, 'disableButton')],
                  [m.callbackButton(`⚰ ${todayDeaths} Meninggal Terbaru`, 'disableButton')],
                  [m.callbackButton(`💪 ${recovered} Sembuh`, 'disableButton')]
                ])
              )
          )
        }
      })
      .catch(({ response: { status, data } }) => {
        if (status === 404) {
          ctx.reply('Negara tidak ditemukan atau tidak memiliki kasus')
        } else {
          ctx.reply('Sepertinya lagi ada kendala, silahkan coba lagi')
        }
        console.log(data)
      })
  })
}
