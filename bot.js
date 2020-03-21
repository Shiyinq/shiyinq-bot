require('dotenv').config()

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const express = require('express')
const app = express()

require('fs').readdirSync('./commands')
  .forEach(function (file) {
    require('./commands/' + file)(bot)
  })

bot.launch()

app.get('/', (req, res) => res.send("Hello world!, I'm Bot\n"))

app.listen(3000)
