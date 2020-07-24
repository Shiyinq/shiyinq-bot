var URL = require('url').URL

class Settings {
  constructor (baseURL = 'https://api.jikan.moe', version = 3) {
    this.setBaseURL(baseURL, version)
  }

  /**
   * Delivers the full API Base URL
   * @returns {URL}
   */
  getBaseURL () {
    return this.baseURL
  }

  /**
   * can be used to replace the current API Base URL by a complete new one
   * @param {string} baseURL
   * @param {number} [version]
   */
  setBaseURL (baseURL, version) {
    if (version) this.v = version
    this.baseURL = new URL(`/v${this.v}`, baseURL)
  }

  /**
   * can be used to change the API version
   * @param {number} version
   */
  set version (version) {
    this.v = version
    this.baseURL.pathname = `/v${version}`
  }

  /**
   * delivers the currently used API version
   * @returns {number}
   */
  get version () {
    return this.v
  }

  set port (port) {
    this.baseURL.port = port
  }

  get port () {
    return this.baseURL.port
  }
}

const myUrl = new Settings()

// myUrl.setBaseURL('https://shiyinq.com', 5)
// console.log(myUrl.version = 1)
myUrl.port = 8000
console.log(myUrl.port)
console.log(new URL('https://api.jikan.moe/v3/search/anime?q=Fate/Zero&page=1'))
