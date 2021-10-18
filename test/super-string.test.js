'use strict'
const chai = require('chai')
const expect = chai.expect

const SuperString = require('../src/super-string')
describe('SuperString', () => {
  describe('.findMaximumOverlap()', () => {
    it('returns max -1 and an empty string if no overlap', () => {
      const { max, str } = SuperString.findMaximumOverlap('AAA', 'BBB')
      expect(max).to.equal(-1)
      expect(str).to.equal('')
    })
    it('returns max 1 and an overlap string for one character overlap', () => {
      const { max, str } = SuperString.findMaximumOverlap('AAA', 'ABB')
      expect(max).to.equal(1)
      expect(str).to.equal('AAABB')
    })
    it('string order is important if max overlap length is equal in both cases', () => {
      const s1 = 'AAA'
      const s2 = 'AABBAA'
      const { max: max1, str: str1 } = SuperString.findMaximumOverlap(s1, s2)
      const { max: max2, str: str2 } = SuperString.findMaximumOverlap(s2, s1)
      expect(max1).to.equal(2)
      expect(str1).to.equal(s2 + s1.substring(2))
      expect(max2).to.equal(max1)
      expect(str2).to.equal(s1 + s2.substring(2))
    })
  })

  describe('.calc()', () => {
    it('returns the concatenation of the strings if no overlap', () => {
      const s1 = 'AAA'
      const s2 = 'BBB'
      const s3 = 'CCC'
      const s4 = 'DDD'
      const superString = SuperString.calc([s1, s2, s3, s4])
      expect(superString).to.equal(s1 + s4 + s3 + s2)
    })
    it('returns the shortest string', () => {
      const s1 = 'AAA'
      const s2 = 'BBB'
      const s3 = 'BBB'
      const s4 = 'AAA'
      const superString = SuperString.calc([s1, s2, s3, s4])
      expect(superString).to.equal(s1 + s2)
    })
    it('returns an empty string if the input array is empty', () => {
      const superString = SuperString.calc([])
      expect(superString).to.equal('')
    })
  })

  describe('.getScore()', () => {
    const s1 = 'AAA'
    const s2 = 'BBB'
    const s3 = 'BBB'
    const s4 = 'AAA'
    it('returns the percentage of total length reduction input case A', () => {
      const input = [s1, s2, s3, s4]
      const superString = SuperString.calc(input)
      const score = SuperString.getScore(input, superString)
      expect(score).to.equal(50)
    })
    it('returns the percentage of total length reduction input case B', () => {
      const input = [s1, s1, s1, s1, s2, s2, s1, s2]
      const superString = SuperString.calc(input)
      const score = SuperString.getScore(input, superString)
      expect(score).to.equal(75)
    })
  })
})
