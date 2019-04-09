const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')

const { mainMenu, smalltalk, def } = require('./brain')
const { axiosNluOptions, tokenBot } = require('../config')

const bot = new TelegramBot(tokenBot, { polling: true })
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
  // mengabaikan entity yang kosong
  function getSafe (fn) {
    try {
      return fn()
    } catch (e) {
      return undefined
    }
  }
  // Hit Api ShiyinqNlu
  axios(axiosNluOptions(msgProcessing())).then((res) => {
    let fallback = true
    let shiNlu = res.data.result

    if (!msg.reply_to_message) {
      // TRIGER WITH KEYWORD

      switch (msgProcessing()) {
        case '/start':
          fallback = false
          mainMenu.start(msg, bot)
          break
        case '/help':
          fallback = false
          mainMenu.help(msg, bot)
          break
        case '/about':
          fallback = false
          mainMenu.about(msg, bot)
          break
        case 'ping':
          fallback = false
          mainMenu.ping(msg, bot)
          break
        default:
          fallback = true
      }

      // TRIGER WITH NLU
      if (getSafe(() => shiNlu.type_phrase[0].value === 'question' && shiNlu.smalltalk[0].value === 'namabot')) {
        fallback = false
        smalltalk.namaBot(msg, bot)
      }

      if (getSafe(() => shiNlu.type_phrase[0].value === 'greetings' && shiNlu.smalltalk[0].value === 'sapabot')) {
        fallback = false
        smalltalk.sapaBot(msg, bot)
      }

      if (getSafe(() => shiNlu.type_phrase[0].value === 'greetings' && shiNlu.smalltalk[0].value === 'slmtpagi')) {
        fallback = false
        smalltalk.selamatPagi(msg, bot)
      }

      if (getSafe(() => shiNlu.type_phrase[0].value === 'greetings' && shiNlu.smalltalk[0].value === 'slmtsiang')) {
        fallback = false
        smalltalk.selamatSiang(msg, bot)
      }

      if (getSafe(() => shiNlu.type_phrase[0].value === 'greetings' && shiNlu.smalltalk[0].value === 'slmtsore')) {
        fallback = false
        smalltalk.selamatSore(msg, bot)
      }

      if (getSafe(() => shiNlu.type_phrase[0].value === 'greetings' && shiNlu.smalltalk[0].value === 'slmtmalam')) {
        fallback = false
        smalltalk.selamatMalam(msg, bot)
      }

      if (getSafe(() => shiNlu.listFeaturs[0].value === 'menu')) {
        fallback = false
        mainMenu.menuBot(msg, bot)
      }

      if (getSafe(() => shiNlu.listFeaturs[0].value === 'qrcode')) {
        fallback = false
        mainMenu.qrcodedesc(msg, bot)
      }

      if (getSafe(() => shiNlu.listFeaturs[0].value === 'news')) {
        fallback = false
        mainMenu.berita(msg, bot)
      }

      if (getSafe(() => shiNlu.listFeaturs[0].value === 'generatelorem')) {
        fallback = false
        mainMenu.lorem(msg, bot)
      }

      if (getSafe(() => shiNlu.listFeaturs[0].value === 'quoterandom')) {
        fallback = false
        mainMenu.quoteRandom(msg, bot)
      }

      // DEFAULT RESPONSE
      if (fallback) def.responDefault(msg, bot)
    }
  }).catch((err) => {
    def.errorMessage(msg, bot)
    console.log(err)
  })
})
