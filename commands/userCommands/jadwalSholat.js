const axios = require('axios')

function dateNow () {
  var local = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
  let now = new Date(local)
  let date = now.getDate()
  let month = now.getMonth()
  let year = now.getFullYear()

  return `${date.toString().length === 1 ? '0' + date : date}/${month.toString().length === 1 ? '0' + (month + 1) : (month + 1)}/${year}`
}
module.exports = (bot) => {
  bot.command('jadwalsholat', (ctx) => {
    let param = ctx.message.text.split(' ')
    let city = param[1] || 'Jakarta'
    let date = param[2] || dateNow()
    let regexDate = '^[0-9]{1,2}(/|-)[0-9]{1,2}(/|-)[0-9]{4}$'
    let regex = new RegExp(regexDate)
    let baseURL = 'https://api.banghasan.com/sholat/format/json'

    if (!date.match(regex)) {
      ctx.reply('Mohon masukan tanggal sesuai format dd/mm/yyyy')
    } else {
      date = date.split('/')
      date = `${date[2]}-${date[1]}-${date[0]}`

      axios.get(`${baseURL}/kota/nama/${city}`)
        .then(({ data: { kota } }) => {
          let [{ id, nama }] = kota
          if (kota.length === 0) {
            ctx.reply('Kota yang ada cari tidak ada')
          } else {
            axios.get(`${baseURL}/jadwal/kota/${id}/tanggal/${date}`)
              .then(({ data: { jadwal: { data } } }) => {
                let { ashar, dhuha, dzuhur, imsak, isya, maghrib, subuh, tanggal, terbit } = data
                let jadwal = `<b>🕌 Jadwal Sholat 🕌</b>\n\n<i>${tanggal}\n${nama}</i>\n\n<code>Imsak   - ${imsak} WIB\nSubuh   - ${subuh} WIB\nTerbit  - ${terbit} WIB\nDhuha   - ${dhuha} WIB\nDzuhur  - ${dzuhur} WIB\nAshar   - ${ashar} WIB\nMaghrib - ${maghrib} WIB\nIsya    - ${isya} WIB</code>`

                ctx.replyWithHTML(jadwal)
              })
              .catch(err => {
                console.log(err)
                ctx.reply('Lagi ada kendala nih, coba lagi nanti yaa')
              })
          }
        })
        .catch(err => {
          console.log(err)
          ctx.reply('Lagi ada kendala nih, coba lagi nanti yaa')
        })
    }
  })
}
