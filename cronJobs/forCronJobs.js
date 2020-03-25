const Extra = require('telegraf/extra')

function random (list = []) {
  let getRandomResponse = list[Math.floor(Math.random() * list.length)]
  return getRandomResponse
}

module.exports = (app, tg, axios) => {
  app.get('/news', (req, res) => {
    let categorys = ['business', 'entertainment', 'health', 'science', 'sports', 'technology']
    let urlNews = `https://newsapi.org/v2/top-headlines?country=id&category=${random(categorys)}&pageSize=5&apiKey=${process.env.TOKEN_NEWSAPI}`

    tg.sendMessage(process.env.OWNER, 'Aku punya berita baru buat kamu')
    axios.get(urlNews)
      .then(res => {
        let datas = res.data.articles

        datas.forEach(data => {
          let title = data.title
          let url = data.url
          let urlImage = data.urlToImage

          tg.sendPhoto(process.env.OWNER, { url: urlImage },
            Extra.load({ caption: title })
              .markdown()
              .markup((m) =>
                m.inlineKeyboard([
                  [m.urlButton('📖 Baca', url)]
                ])
              )
          )
        })
      })
      .catch((err) => {
        console.llog(err)
      })
    res.send('OK')
  })

  app.get('/pagi', (req, res) => {
    let text = [
      'Pagi..',
      'Selamat pagi, kamu udah bangun ? jangan lupa sarapan yaa',
      'Hi Selamat pagi.. yang semangat ya hari ini'
    ]
    tg.sendMessage(process.env.OWNER, random(text))
    res.send('OK')
  })

  app.get('/siang', (req, res) => {
    let text = [
      'Siangg..',
      'Selamat siang, udah makan siang ?',
      'Siang siang itu enaknya tidur siang lohh'
    ]
    tg.sendMessage(process.env.OWNER, random(text))
    res.send('OK')
  })

  app.get('/sore', (req, res) => {
    let text = [
      'Sore.. udah pulang kerja ?',
      'Sore..Tetep semangat ya walaupun capek..',
      'Sore.. lagi dimana ? udah pulang ? jangan lupa makan kalau sampe rumah yaa'
    ]
    tg.sendMessage(process.env.OWNER, random(text))
    res.send('OK')
  })

  app.get('/malam', (req, res) => {
    let text = [
      'Malemmm..',
      'Selamat malam, semoga mimpi indah',
      'Tidur dong.. udah malem ini, jangan sampe kesiangan besok'
    ]
    tg.sendMessage(process.env.OWNER, random(text))
    res.send('OK')
  })
}
