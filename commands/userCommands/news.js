const axios = require('axios')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

module.exports = (bot) => {
  bot.command('news', (ctx) => {
    let category = ctx.message.text.split(' ')[1]
    let length = ctx.message.text.split(' ')[2]
    let categorys = ['business', 'entertainment', 'health', 'science', 'sports', 'technology']

    let defCategory = category || 'technology'
    let defLength = length || 3

    let urlNews = `https://newsapi.org/v2/top-headlines?country=id&category=${defCategory}&pageSize=${defLength}&apiKey=${process.env.TOKEN_NEWSAPI}`

    if (categorys.includes(defCategory)) {
      axios.get(urlNews)
        .then(res => {
          let datas = res.data.articles

          datas.forEach(data => {
            let title = data.title
            let url = data.url
            let urlImage = data.urlToImage

            const keyboard = Markup.inlineKeyboard([
              Markup.urlButton(title, url)
            ])

            ctx.replyWithPhoto(urlImage, Extra.markup(keyboard))
          })
        })
        .catch(() => {
          ctx.reply('Sepertinya ada kendala, cobalagi nanti yaa')
        })
    } else {
      ctx.reply(`Kategori ${category} tidak ada`)
    }
  })
}
