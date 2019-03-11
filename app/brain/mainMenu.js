const axios = require('axios')
const { tokenNewsapi } = require('../../config')

class MainMenu {
  constructor () {
    this.resBot = null
  }
  start (msg, bot) {
    this.resBot = `😀 Halo ${msg.chat.first_name}.. 
    \n🎉 Selamat datang..
    \n📃 Silahkan Ketikan /menu untuk melihat daftar perintah yang lainnya 😘`

    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
  help (msg, bot) {
    this.resBot = 'Silahkan ketikan /menu ka 😀'
    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
  about (msg, bot) {
    this.resBot = `💁‍Halo perkenalkan nama saya Shiyinq
    \nSaya dibuat oleh [@Shiyinq]("https://t.me/Shiyinq")`
    bot.sendMessage(msg.chat.id, this.resBot, { parse_mode: 'Markdown', reply_to_message_id: msg.message_id })
  }
  menuBot (msg, bot) {
    this.resBot = `*📜 Daftar Perintah*
    -------------------------------
    🎈 /Lorem
    🎈 /Qrcode
    🎈 /Berita
    🎈 /Quote
    \n👨‍💻 Perintah lain sedang dikembangkan
    \n Coming Soon.. 👨‍💻
    \n 🍭 [@Shiyinq~]("https://t.me/Shiyinq")`

    bot.sendMessage(msg.chat.id, this.resBot, { parse_mode: 'Markdown', reply_to_message_id: msg.message_id })
  }
  lorem (msg, bot) {
    this.resBot = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec mollis lacus, id ornare lacus. Donec diam tellus, feugiat ut consequat sit amet, pellentesque vitae ipsum.  In semper sollicitudin erat in vehicula. Nullam eleifend justo ac ipsum posuere, eget sodales ex pharetra. Etiam ut neque sit amet ex tincidunt aliquet id ut sapien. Aenean quis tincidunt diam. In quis velit in tellus vehicula dapibus in aliquam ipsum. Maecenas id lorem ac augue imperdiet mattis nec ut nibh. Suspendisse potenti. Duis felis massa, sodales vitae suscipit quis, gravida sit amet risus. Ut dictum molestie venenatis.'

    bot.sendMessage(msg.chat.id, this.resBot, { reply_to_message_id: msg.message_id })
  }
  qrcodedesc (msg, bot) {
    bot.sendMessage(msg.chat.id, 'Silahkan ketikan kalimat yang ingin digenerate 💁‍/ ketik cancel untuk batal 🙅‍', { reply_to_message_id: msg.message_id, reply_markup: { force_reply: true, selective: true } }).then(() => {
      bot.once('text', (msg) => {
        if (msg.reply_to_message) {
          let batal = ['cancel', 'batal', 'gak jadi'].includes(msg.text.toLowerCase())
          if (batal) {
            bot.sendMessage(msg.chat.id, 'Oke tidak masalah 😘', { reply_to_message_id: msg.message_id })
          } else {
            let urlPhoto = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${msg.text}`
            bot.sendMessage(msg.chat.id, 'Hasil generate: ' + msg.text, { reply_to_message_id: msg.message_id })
            bot.sendPhoto(msg.chat.id, urlPhoto)
          }
        }
      })
    })
  }
  berita (msg, bot) {
    bot.sendMessage(msg.chat.id, 'Berita teknologi terbaru untuk anda 💁‍, Selamat membaca 🤗', { reply_to_message_id: msg.message_id })
    axios.get(`https://newsapi.org/v2/top-headlines?country=id&category=technology&pageSize=3&apiKey=${tokenNewsapi}`)
      .then(res => {
        let datas = res.data.articles
        datas.forEach(data => {
          this.resBot = `
          *${data.title}* [Selengkapnya 💨](${data.url})
         `
          bot.sendMessage(msg.chat.id, this.resBot, { parse_mode: 'Markdown' })
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  quoteRandom (msg, bot) {
    axios.get('https://quotesondesign.com/wp-json/posts?filter%5Borderby%5D=rand&filter%5Bposts_per_page%5D=1&callback=')
      .then(res => {
        this.resBot = '\n_"' + res.data[0].content + '"_\n\n' + '🎼 `by: ' + res.data[0].title + '`'
        bot.sendMessage(msg.chat.id, this.resBot, { parse_mode: 'markdown', reply_to_message_id: msg.message_id })
      })
      .catch(err => {
        console.log(err)
      })
  }
  ping (msg, bot) {
    let options = {
      'parse_mode': 'Markdown',
      'reply_to_message_id': msg.message_id
    }
    bot.sendMessage(msg.chat.id, 'Ping pong! 🏓🏓', options)
  }
}

const mainMenu = new MainMenu()
module.exports = mainMenu
