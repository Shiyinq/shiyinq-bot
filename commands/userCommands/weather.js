const { OPEN_WHEATER_KEY } = process.env
const openweather = 'https://api.openweathermap.org/data/2.5/'

function icons (icon) {
  let icons = {
    '01d': '☀️',
    '02d': '🌤',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '🌧',
    '10d': '🌧',
    '11d': '⛈',
    '13d': '❄️',
    '50d': '🌫',
    '01n': '☀️',
    '02n': '🌤',
    '03n': '☁️',
    '04n': '☁️',
    '09n': '🌧',
    '10n': '🌧',
    '11n': '⛈',
    '13n': '❄️',
    '50n': '🌫'
  }

  return icons[icon]
}

function kelvinToCelcius (kelvin) {
  return Math.floor(kelvin - 273) + '°C'
}

function convertToDate (unixTimestamp) {
  let date = new Date(unixTimestamp * 1000)

  // let d = date.getDate()
  // let m = date.getMonth()
  // let y = date.getFullYear()
  let hours = date.getHours()
  let minutes = '0' + date.getMinutes()
  let seconds = '0' + date.getSeconds()

  // let formattedDate = `${d}-${m}-${y}`
  let formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`

  return formattedTime
}

module.exports = (bot, tg, axios) => {
  bot.command('weather', (ctx) => {
    let city = ctx.message.text.split(' ')[1]

    if (!city) {
      ctx.reply('Error, coba /weather jakarta')
    } else {
      axios.get(`${openweather}weather?q=${city}&appid=${OPEN_WHEATER_KEY}`)
        .then(({ data }) => {
          let { name, cod, coord, weather, main, sys } = data
          let { lon, lat } = coord
          let { description, icon } = weather[0]
          let { temp, feels_like, temp_min, temp_max, humidity } = main
          let { sunrise, sunset } = sys

          let response = `📌 <b>${name}</b> - Cuaca saat ini\n\n${icons(icon)} ${description} (${kelvinToCelcius(temp)})\n\n- Seperti: ${kelvinToCelcius(feels_like)}\n- Temp Min: ${kelvinToCelcius(temp_min)}\n- Temp Max: ${kelvinToCelcius(temp_max)}\n- Kelembaban: ${humidity}%\n\n🌅 ${convertToDate(sunrise)}\n\n🌇 ${convertToDate(sunset)}\n\n\n📌 <b>${name}</b> - Ramalan cuaca besok`

          if (cod === 200) {
            axios.get(`${openweather}forecast?q=${city}&appid=${OPEN_WHEATER_KEY}`)
              .then(({ data: { list } }) => {
                list = list.slice(6, 10)
                list.forEach(w => {
                  response += `\n\n📅 <b>${w.dt_txt}</b>\n\n${icons(w.weather[0].icon)} ${w.weather[0].description} (${kelvinToCelcius(main.temp)})\n\n- Seperti: ${kelvinToCelcius(main.feels_like)}\n- Temp Min: ${kelvinToCelcius(main.temp_min)}\n- Temp Max: ${kelvinToCelcius(main.temp_max)}\n- Kelembaban: ${main.humidity}%`
                })

                response += `\n\n🌐 lat,lon (${lat},${lon})\n\n✔️ Sumber: openweathermap.org`

                ctx.replyWithHTML(response)
              })
          }
        })
        .catch(({ data }) => {
          ctx.reply('Kota tidak ada, coba masukan kota terdekat anda')
        })
    }
  })
}
