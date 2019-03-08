const TelegramBot = require('node-telegram-bot-api')
const token = require('./config/index').token_bot
const brain = require('./app/brain/index')
const axios = require('axios')
const {axios_nlu_options} = require('./config/index')

const bot = new TelegramBot(token, { polling: true })
// Matches "/echo [whatever]"
// /\/echo (.+)/

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = match[1]
  bot.sendMessage(chatId, resp)
})

bot.on('message', (msg) => {
  function msgProcessing () {
    return msg.text.toLowerCase()
  }

  // ShiyinqNlu
  axios(axios_nlu_options(msgProcessing()))
  .then((res) => {
    
    let shiNlu =  res.data.result

    if (!msg.reply_to_message) {
      
      // smalltalk
      if (shiNlu.type_phrase[0].value == 'question' && shiNlu.smalltalk[0].value == 'namabot'){
        brain.smalltalk.namaBot(msg, bot)
      }

      if (shiNlu.type_phrase[0].value == 'greetings' && shiNlu.smalltalk[0].value == 'sapabot'){
        brain.smalltalk.sapaBot(msg, bot)
      }

      if (shiNlu.type_phrase[0].value == 'greetings' && shiNlu.smalltalk[0].value == 'slmtpagi'){
        brain.smalltalk.selamatPagi(msg, bot)
      }

      if (shiNlu.type_phrase[0].value == 'greetings' && shiNlu.smalltalk[0].value == 'slmtsiang'){
        brain.smalltalk.selamatSiang(msg, bot)
      }

      if (shiNlu.type_phrase[0].value == 'greetings' && shiNlu.smalltalk[0].value == 'slmtsore'){
        brain.smalltalk.selamatSore(msg, bot)
      }

      if (shiNlu.type_phrase[0].value == 'greetings' && shiNlu.smalltalk[0].value == 'slmtmalam'){
        brain.smalltalk.selamatMalam(msg, bot)
      }

      switch (msgProcessing()) {
        case '/start':
          brain.mainMenu.start(msg, bot)
          break
        case '/help':
          brain.mainMenu.help(msg, bot)
          break
        case '/about':
          brain.mainMenu.about(msg, bot)
          break
        case '/menu':
          brain.mainMenu.menuBot(msg, bot)
          break
        case '/qrcode':
          brain.mainMenu.qrcodedesc(msg, bot)
          break
        case '/lorem':
          brain.mainMenu.lorem(msg, bot)
          break
        case '/beritateknologi':
          brain.mainMenu.berita(msg, bot)
          break
        case '/quoterandom':
          brain.mainMenu.quoteRandom(msg, bot)
          break
        case 'ping':
          brain.mainMenu.ping(msg, bot)
          break
        default:
          brain.fallback.responDefault(msg, bot)
      }
    }




  }).catch((err) => {
    brain.fallback.errorMessage(msg, bot)
    console.log('Terjadi error')
  })


})
