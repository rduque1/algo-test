'use strict'
const path = require('path')
const chai = require('chai')
const fs = require('fs')
const sinon = require('sinon')
const FileUtils = require('../src/file-utils')

const expect = chai.expect
const testFile = path.join(__dirname, '/assets/test.txt')

describe('FileUtils', async () => {
  describe('.fileExists()', async () => {
    it('returns true if the file exists', async () => {
      const exists = await FileUtils.fileExists(testFile)
      expect(exists).to.equal(true)
    })
    it('returns false if does not file exists', async () => {
      const exists = await FileUtils.fileExists('invalidPath')
      expect(exists).to.equal(false)
    })
  })
  describe('.processLineByLine()', async () => {
    let lineNb
    before(async () => {
      const data = fs.readFileSync(testFile)
      lineNb = data.toString().split('\n').length - 1
    })
    it('process file line by line', async () => {
      const lines = []
      const callback = (line) => lines.push(line)
      await FileUtils.processLineByLine(testFile, callback)
      expect(lines.length).to.equal(lineNb)
    })
    it('call the callback for each line', async () => {
      const spy = sinon.spy()
      await FileUtils.processLineByLine(testFile, spy)
      expect(spy.called).to.equal(true)
      expect(spy.callCount).to.equal(lineNb)
    })
  })
})
