const commands = require('../../commands.json')

module.exports = (bot) => {
  bot.command('menu', (ctx) => {
    let listCommand = '💻 List Command\n\n'

    commands.forEach(cmd => {
      listCommand += `/${cmd.name} ${cmd.parameter} - ${cmd.description}\n`
    })

    ctx.reply(listCommand)
  })
}
