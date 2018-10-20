const axios = require('axios')
const newsapi = require('../../config/index').token_newsapi

let resBot = null;

module.exports = {
    start: function(msg, bot){
        bot.sendMessage(msg.chat.id, `Halo ${msg.chat.first_name}.. \nSelamat datang \nKetikan perintah /menu untuk melihat daftar perintah yang lainnya`, {reply_to_message_id: msg.message_id});
    },
    menuBot: function(msg, bot){
        resBot = '*Daftar Perintah*\n------------------------------ \n-/Lorem \n-/Qrcode \n-/BeritaTeknologi \n-/QuoteRandom';
        bot.sendMessage(msg.chat.id, resBot, {parse_mode: 'Markdown', reply_to_message_id: msg.message_id});
    },
    lorem: function(msg, bot){
        resBot =`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec mollis lacus, id ornare lacus. Donec diam tellus, feugiat ut consequat sit amet, pellentesque vitae ipsum.  In semper sollicitudin erat in vehicula. Nullam eleifend justo ac ipsum posuere, eget sodales ex pharetra. Etiam ut neque sit amet ex tincidunt aliquet id ut sapien. Aenean quis tincidunt diam. In quis velit in tellus vehicula dapibus in aliquam ipsum. Maecenas id lorem ac augue imperdiet mattis nec ut nibh. Suspendisse potenti. Duis felis massa, sodales vitae suscipit quis, gravida sit amet risus. Ut dictum molestie venenatis.`;
        bot.sendMessage(msg.chat.id, resBot, {reply_to_message_id: msg.message_id});
    },
    qrcodedesc: function(msg, bot){
        resBot = '*Cara penggunaan*\n------------------------------ \nqrcod=text yang akan di generate\n \n*Ex*: `qrcode=hello world`';
        bot.sendMessage(msg.chat.id, resBot, {parse_mode: 'Markdown',reply_to_message_id: msg.message_id});
    },
    qrcode: function(msg, bot){
        let text = msg.text.toLowerCase();
        let resText = text.split("qrcode=");

        let urlPhoto = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${resText[1]}`;

        bot.sendMessage(msg.chat.id, 'Hasil generate: ' + resText[1], {reply_to_message_id: msg.message_id});
        bot.sendPhoto(msg.chat.id, urlPhoto);
    },
    berita: function(msg, bot){
        bot.sendMessage(msg.chat.id, 'Berita teknologi terbaru untuk anda', {reply_to_message_id: msg.message_id})
        axios.get(`https://newsapi.org/v2/top-headlines?country=id&category=technology&pageSize=3&apiKey=${newsapi}`)
        .then(res => {
            let datas = res.data.articles;        
            datas.forEach(data => {
                resBot = `
                *${data.title}* [Selengkapnya..](${data.url})
                `;
                bot.sendMessage(msg.chat.id, resBot, {parse_mode: 'Markdown'});
            })
        })
        .catch(err => {
            console.log(err);
        })
    },
    quoteRandom: function(msg, bot){
        axios.get('https://talaikis.com/api/quotes/random/')
        .then(res => {
            resBot = '\n_"' + res.data.quote +'"_\n\n' + '_by: ' + res.data.author + '_';
            bot.sendMessage(msg.chat.id, resBot, {parse_mode: 'Markdown', reply_to_message_id: msg.message_id})
        })
        .catch(err => {
            console.log(err)
        });
    },
    responDefault: function(msg, bot){
        bot.sendMessage(msg.chat.id, 'Maaf saya tidak mengerti ka, hehehe', {reply_to_message_id: msg.message_id});
    },
    ping: function(msg, bot){
        bot.sendMessage(msg.chat.id, '*Ping Pong gan*', {parse_mode: 'Markdown', reply_to_message_id: msg.message_id});
    }
}
