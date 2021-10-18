const SuperString = require('./src/super-string')
const FileUtils = require('./src/file-utils')

function getLineCallback (lines) {
  const lineCallback = (line) => {
    if (line) line = line.trim().toUpperCase().replace(/[^A-Z]+/gi, '')
    // second if as replace could make line empty
    if (line) lines.push(line)
  }
  return lineCallback
}

async function main (filePaths = []) {
  for (const filePath of filePaths) {
    const fileExists = await FileUtils.fileExists(filePath)
    if (!fileExists) {
      console.log(`skipping file "${filePath}" as it cannot be accessed`)
      continue
    }
    const lines = []
    const lineCallback = getLineCallback(lines)
    await FileUtils.processLineByLine(filePath, lineCallback)
    if (lines.length === 0) {
      console.log(`file "${filePath}" is empty or contains invalid words, only A-Z characters are allowed`)
      continue
    }
    const superString = SuperString.calc(lines)
    const score = SuperString.getScore(lines, superString)
    console.log('file:', filePath)
    console.log('\tsuper string:', superString)
    console.log('\t=> score', score)
  }
}

if (require.main === module) {
  main(process.argv.slice(2)).then(() => console.log('done'))
}

module.exports = {
  main,
  getLineCallback
}
