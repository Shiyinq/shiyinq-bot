require('dotenv').config()
const fs = require('fs')
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

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

app.get('/', (req, res) => res.send("Hello world!, I'm Bot\n"))

app.listen(3000)
