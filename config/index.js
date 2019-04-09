require('dotenv').config()
const qs = require('qs')

module.exports = {
  tokenBot: process.env.TOKEN_BOT,
  tokenNewsapi: process.env.TOKEN_NEWSAPI,
  axiosNluOptions (msg) {
    return {
      method: 'POST',
      headers: { 'Authorization': ' Bearer 5821217f-fc30-48b7-84f5-c5afc425973d', 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({ 'text': msg }),
      url: 'https://geist.kata.ai/nlus/Shiyinq:ShiyinqBot/predict'
    }
  }
}
