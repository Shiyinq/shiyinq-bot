module.exports = {
  responseVarian: function (list = []) {
    let getRandomResponse = list[Math.floor(Math.random() * list.length)]
    return getRandomResponse
  }
}
