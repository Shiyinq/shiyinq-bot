const Extra = require('telegraf/extra')

module.exports = (bot, tg, axios) => {
  bot.command('github', (ctx) => {
    let user = ctx.message.text.split(' ')[1]

    if (!user) {
      ctx.reply('Username required, ex: /github Shiyinq')
    } else {
      axios.get(`https://api.github.com/users/${user}`)
        .then(({ data }) => {
          let dataUser = `\n🗒️ About ${user}\n\nName: ${data.name}\nCompany: ${data.company}\nBlog: ${data.blog}\nLocation: ${data.location}\nEmail: ${data.email}\nHireable: ${data.hireable}\nBio: ${data.bio}\nTwitter: ${data.twitter_username}\n\nPublic Repos: ${data.public_repos}\nPublic Gists: ${data.public_gists}\n\nFollowers: ${data.followers}\nFollowing: ${data.following}`

          ctx.replyWithPhoto({ url: data.avatar_url }, Extra.load({ caption: '```' + dataUser + '```' })
            .markdown()
            .markup((m) =>
              m.inlineKeyboard([
                [m.urlButton('Open Github', data.html_url)]
              ])
            )
          )
        })
        .catch(error => {
          ctx.reply(`User ${user} ${error.response.data.message}`)
        })
    }
  })
}
