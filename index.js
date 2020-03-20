require('dotenv').config()

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

require('fs').readdirSync('./commands')
  .forEach(function (file) {
    require('./commands/' + file)(bot)
  })

bot.launch()
