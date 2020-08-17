const commands = require('../../commands.json')

module.exports = (bot) => {
  bot.command('menu', (ctx) => {
    ctx.getChat()
      .then(({ type }) => {
        let listCommand = '💻 List Command\n\n'

        commands.forEach(cmd => {
          if (type === 'private') {
            if (cmd.type !== 'group') {
              listCommand += `/${cmd.name} ${cmd.parameter} - ${cmd.description}\n`
            }
          } else {
            listCommand += `/${cmd.name} ${cmd.parameter} - ${cmd.description}\n`
          }
        })
        ctx.reply(listCommand)
      })
  })
}
