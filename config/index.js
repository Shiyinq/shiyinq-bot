require('dotenv').config()
const qs = require('qs')
module.exports = {
  token_bot: process.env.TOKEN_BOT,
  token_newsapi: process.env.TOKEN_NEWSAPI,
  axios_nlu_options: function (msg) {
    return {
      method: 'POST',
      headers: { 'Authorization': ' Bearer 1ac41fef-5bbd-47d8-90f1-cddeacdc3741', 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ 'text': msg }),
      url: 'https://geist.kata.ai/nlus/Shiyinq:ShiyinqBot/predict'
    }
  }

}
