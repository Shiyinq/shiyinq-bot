require('dotenv').config()
const fs = require('fs')

const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')

const tg = new Telegram(process.env.BOT_TOKEN)
const bot = new Telegraf(process.env.BOT_TOKEN)

const axios = require('axios')

const express = require('express')
const app = express()

fs.readdirSync('./commands')
  .forEach(file => {
    if (fs.statSync('./commands/' + file).isDirectory()) {
      fs.readdirSync('./commands/' + file).forEach((f) => {
        require('./commands/' + file + '/' + f)(bot)
      })
    } else {
      require('./commands/' + file)(bot)
    }
  })

bot.launch()

require('./cronJobs/forCronJobs')(app, tg, axios)
app.get('/', (req, res) => res.send("Hello world!, I'm Bot\n"))

app.listen(3000)
