const { once } = require('events')
const fs = require('fs')
const { createInterface } = require('readline')
const { createReadStream } = fs

class FileUtils {
  static async processLineByLine (filePath, lineCallback) {
    try {
      const rl = createInterface({
        input: createReadStream(filePath),
        crlfDelay: Infinity
      })
      rl.on('line', lineCallback)
      await once(rl, 'close')
    } catch (err) {
      console.error(err)
    }
  }

  static fileExists (path) {
    return new Promise((resolve) => fs.access(path, fs.F_OK, (err) => err ? resolve(false) : resolve(true)))
  }
}

module.exports = FileUtils
