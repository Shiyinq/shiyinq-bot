const axios = require('axios')
const newsapi = require('../../config/index').token_newsapi

let resBot = null

module.exports = {
  start: function (msg, bot) {
    resBot = '😀 Halo ' + msg.chat.first_name + '..' +
                 '\n\n🎉 Selamat datang..' +
                 '\n\n📃 Silahkan Ketikan /menu untuk melihat daftar perintah yang lainnya 😘'

    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  menuBot: function (msg, bot) {
    resBot = '*📜 Daftar Perintah*' +
             '\n-------------------------------' +
             '\n🎈 /Lorem' +
             '\n🎈 /Qrcode' +
             '\n🎈 /BeritaTeknologi' +
             '\n🎈 /QuoteRandom' +
             '\n\n👨‍💻 Perintah lain sedang dikembangkan' +
             '\n Coming Soon.. 👨‍💻' +
             '\n\n 🍭 [@Shiyinq~]("https://t.me/Shiyinq")'

    bot.sendMessage(msg.chat.id, resBot, { parse_mode: 'Markdown', reply_to_message_id: msg.message_id })
  },
  lorem: function (msg, bot) {
    resBot = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec mollis lacus, id ornare lacus. Donec diam tellus, feugiat ut consequat sit amet, pellentesque vitae ipsum.  In semper sollicitudin erat in vehicula. Nullam eleifend justo ac ipsum posuere, eget sodales ex pharetra. Etiam ut neque sit amet ex tincidunt aliquet id ut sapien. Aenean quis tincidunt diam. In quis velit in tellus vehicula dapibus in aliquam ipsum. Maecenas id lorem ac augue imperdiet mattis nec ut nibh. Suspendisse potenti. Duis felis massa, sodales vitae suscipit quis, gravida sit amet risus. Ut dictum molestie venenatis.'

    bot.sendMessage(msg.chat.id, resBot, { reply_to_message_id: msg.message_id })
  },
  qrcodedesc: function (msg, bot) {
    bot.sendMessage(msg.chat.id, 'Silahkan ketikan kalimat yang ingin digenerate 💁‍/ ketik cancel untuk batal 🙅‍', { reply_to_message_id: msg.message_id }).then(() => {
      bot.once('text', (msg) => {
        if (msg.text.toLowerCase() === 'cancel') {
          bot.sendMessage(msg.chat.id, 'Oke tidak masalah 😘', { reply_to_message_id: msg.message_id })
        } else {
          let urlPhoto = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${msg.text}`
          bot.sendMessage(msg.chat.id, 'Hasil generate: ' + msg.text, { reply_to_message_id: msg.message_id })
          bot.sendPhoto(msg.chat.id, urlPhoto)
        }
      })
    })
  },
  berita: function (msg, bot) {
    bot.sendMessage(msg.chat.id, 'Berita teknologi terbaru untuk anda 💁‍, Selamat membaca 🤗', { reply_to_message_id: msg.message_id })
    axios.get(`https://newsapi.org/v2/top-headlines?country=id&category=technology&pageSize=3&apiKey=${newsapi}`)
      .then(res => {
        let datas = res.data.articles
        datas.forEach(data => {
          resBot = `
          *${data.title}* [Selengkapnya 💨](${data.url})
         `
          bot.sendMessage(msg.chat.id, resBot, { parse_mode: 'Markdown' })
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  quoteRandom: function (msg, bot) {
    axios.get('https://talaikis.com/api/quotes/random/')
      .then(res => {
        resBot = '\n_"' + res.data.quote + '"_\n\n' + '🎼 `by: ' + res.data.author + '`'
        bot.sendMessage(msg.chat.id, resBot, { parse_mode: 'Markdown', reply_to_message_id: msg.message_id })
      })
      .catch(err => {
        console.log(err)
      })
  },
  responDefault: function (msg, bot) {
    bot.sendMessage(msg.chat.id, '😥 Maaf saya tidak mengerti ka..', { reply_to_message_id: msg.message_id })
  },
  ping: function (msg, bot) {
    // var options = {
    //   'parse_mode': 'Markdown',
    //   'reply_to_message_id': msg.message_id,
    //   'reply_markup': {
    //     'one_time_keyboard': true,
    //     'keyboard': [[{
    //       text: 'Menu',
    //       url: '/menu'
    //     }],
    //     [{
    //       text: 'Start',
    //       url: '/start'
    //     }],
    //     ['Cancel']]
    //   }
    // }
    // bot.sendMessage(msg.chat.id, 'Send kamu siapa ?', options).then(() => {
    //   bot.once('text', (msg) => {
    //     bot.sendMessage(msg.chat.id, 'Halo ' + msg.text, options)
    //   })
    // })
    bot.sendMessage(msg.chat.id, 'Ping pong! 🏓🏓', { reply_to_message_id: msg.message_id })
  }
}
