class Tools {
  responseVarian (list = []) {
    let getRandomResponse = list[Math.floor(Math.random() * list.length)]
    return getRandomResponse
  }
}

const tools = new Tools()
module.exports = tools
