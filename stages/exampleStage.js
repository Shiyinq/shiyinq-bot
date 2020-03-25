module.exports = (Scene, leave) => {
  const greeter = new Scene('exampleStage')
  greeter.enter((ctx) => ctx.reply('Hi'))
  greeter.leave((ctx) => ctx.reply('Bye'))
  greeter.hears(/batal/gi, leave())
  greeter.on('message', (ctx) => {
    console.log(ctx.scene)
    ctx.reply(`Ketik 'batal'`)
  })
  return greeter
}
