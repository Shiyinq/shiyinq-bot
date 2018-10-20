const TelegramBot = require('node-telegram-bot-api');
const token = require('./config/index').token_bot;
const brain = require('./app/brain/index');

const bot = new TelegramBot(token, {polling: true});
 
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1];
 
  bot.sendMessage(chatId, resp);
});
 

bot.on('message', (msg) => {

  switch (msg.text.toLowerCase()) {
    case '/start':
      brain.start(msg, bot);
      break;
    case '/help':
      brain.start(msg, bot);
      break;
    case '/menu':
      brain.menuBot(msg, bot);
      break;
    case '/qrcode':
      brain.qrcodedesc(msg, bot);
      break;
    case '/lorem':
      brain.lorem(msg, bot);
      break;
    case '/beritateknologi':
      brain.berita(msg, bot);
      break;
    case '/quoterandom':
      brain.quoteRandom(msg, bot);
      break;
    case 'ping':
      brain.ping(msg, bot);
      break;
    default:
      let resGenerate = msg.text.toLowerCase().split("=");
      if (resGenerate[0] == 'qrcode') {
        brain.qrcode(msg, bot);
      } else {
        brain.responDefault(msg, bot);
      }
  }
 
});