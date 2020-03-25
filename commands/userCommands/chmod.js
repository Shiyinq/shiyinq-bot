module.exports = (bot) => {
  bot.command('chmod', (ctx) => {
    let param = ctx.message.text.split(' ')[1]
    if (!param) {
      ctx.reply('Format tidak valid')
      return false
    }
    let p2 = parseInt(param)

    let value

    let ogp = [400, 200, 100, 40, 20, 10, 4, 2, 1]
    let ogpV = ['r', 'w', 'x', 'r', 'w', 'x', 'r', 'w', 'x']

    if (!isNaN(p2)) {
      value = ''
      ogp.forEach((v, i) => {
        let r = p2 - ogp[i]
        if (!(r < 0)) {
          p2 = r
          value += ogpV[i]
        } else {
          value += '-'
        }
      })

      p2 === 0 ? ctx.reply(value) : ctx.reply('Format Tidak Valid')
    } else {
      value = 0
      param = param.split('')
      let len = param.length

      if (len !== 9) {
        ctx.reply('Format tidak valid')
      } else {
        param.forEach((v, i) => {
          if (v !== '-') {
            value += ogp[i]
          }
        })

        ctx.reply(value)
      }
    }
  })
}
