module.exports = (bot) => {
  bot.command('examplestage', (ctx) => ctx.scene.enter('exampleStage'))
}
