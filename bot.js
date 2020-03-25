require('dotenv').config()
const fs = require('fs')
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const tg = new Telegram(process.env.BOT_TOKEN)
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

function random (list = []) {
  let getRandomResponse = list[Math.floor(Math.random() * list.length)]
  return getRandomResponse
}

// cron job/pesan otomatis
app.get('/morning', (req, res) => {
  let text = [
    'Pagi..',
    'Selamat pagi, kamu udah bangun ? jangan lupa sarapan yaa',
    'Hi Selamat pagi.. yang semangat ya hari ini'
  ]
  tg.sendMessage(process.env.OWNER, random(text))
  res.send('OK')
})

app.get('/noon', (req, res) => {
  let text = [
    'Siangg..',
    'Selamat siang, udah makan siang ?',
    'Siang siang itu enaknya tidur siang lohh'
  ]
  tg.sendMessage(process.env.OWNER, random(text))
  res.send('OK')
})

app.get('/night', (req, res) => {
  let text = [
    'Malemmm..',
    'Selamat malam, semoga mimpi indah',
    'Tidur dong.. udah malem ini, jangan sampe kesiangan besok'
  ]
  tg.sendMessage(process.env.OWNER, random(text))
  res.send('OK')
})

app.get('/', (req, res) => res.send("Hello world!, I'm Bot\n"))

app.listen(3000)
