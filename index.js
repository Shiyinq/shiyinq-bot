const TelegramBot = require('node-telegram-bot-api')
const token = require('./config/index').token_bot
const brain = require('./app/brain/index')

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
  if (!msg.reply_to_message) {
    switch (msgProcessing()) {
      case '/start':
        brain.start(msg, bot)
        break
      case '/help':
        brain.help(msg, bot)
        break
      case '/about':
        brain.about(msg, bot)
        break
      case '/menu':
        brain.menuBot(msg, bot)
        break
      case '/qrcode':
        brain.qrcodedesc(msg, bot)
        break
      case '/lorem':
        brain.lorem(msg, bot)
        break
      case '/beritateknologi':
        brain.berita(msg, bot)
        break
      case '/quoterandom':
        brain.quoteRandom(msg, bot)
        break
      case 'ping':
        brain.ping(msg, bot)
        break
      default:
        // console.log('')
        brain.responDefault(msg, bot)
    }
  }
})
