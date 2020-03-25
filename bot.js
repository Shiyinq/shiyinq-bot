require('dotenv').config()
const fs = require('fs')

const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')

const tg = new Telegram(process.env.BOT_TOKEN)
const bot = new Telegraf(process.env.BOT_TOKEN)

const axios = require('axios')

const express = require('express')
const app = express()

bot.use((ctx, next) => {
  const ownerOlny = process.env.OWNER_ONLY
  const start = new Date()

  ctx.getChat().then(async ({ id }) => {
    if (ownerOlny) {
      if (id.toString() === process.env.OWNER) {
        console.log('is onwer')
        await next()
        const ms = new Date() - start
        console.log('Response time: %sms', ms)
      } else {
        console.log('not owner')
      }
    } else {
      await next()
      const ms = new Date() - start
      console.log('Response time: %sms', ms)
    }
  }).catch(err => console.log(err))
})

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
