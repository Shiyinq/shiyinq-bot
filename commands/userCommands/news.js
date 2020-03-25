const axios = require('axios')
const Extra = require('telegraf/extra')

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

            ctx.replyWithPhoto({ url: urlImage },
              Extra.load({ caption: title })
                .markdown()
                .markup((m) =>
                  m.inlineKeyboard([
                    [m.urlButton('📖 Baca', url)],
                    [m.callbackButton('❌ Hapus', 'deleteNews')]
                  ])
                )
            )
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
