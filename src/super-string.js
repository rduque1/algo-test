class SuperString {
  static findMaximumOverlap (str1, str2) {
    let max = -1
    const minLen = Math.min(str1.length, str2.length)
    let resultStr = ''

    const checkSuffixPrefixMatches = (strA, strB) => {
      const lenA = strA.length
      for (let i = 1; i <= minLen; i++) {
        // compare last i characters in strA with first i characters in strB
        if (strA.substring(lenA - i).localeCompare(strB.substring(0, i)) === 0) {
          if (max < i) { // Update max and str
            max = i
            resultStr = strA + strB.substring(i)
          }
        }
      }
    }
    checkSuffixPrefixMatches(str2, str1)
    checkSuffixPrefixMatches(str1, str2)

    return { max, str: resultStr }
  }

  // Function to calculate smallest string that contains
  // each string in the given set as substring.
  static calc (strArr) {
    const strArrCp = [...strArr].filter(s => s)
    let len = strArrCp.length
    if (len === 0) return ''
    // run len - 1 times to consider every pair
    while (len !== 1) {
      let max = -1 // To store maximum overlap
      let idxMaxOverlapStrA = 0
      let idxMaxOverlapStrB = 0
      // to store resultant string after maximum overlap
      let resStr = ''
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          // res will store maximum length of the matching prefix and suffix str is
          // str store the resultant string after maximum overlap of strArrCp[i] and strArrCp[j]
          const { max: res, str } = this.findMaximumOverlap(strArrCp[i], strArrCp[j])
          if (max < res) {
            max = res
            resStr = str
            idxMaxOverlapStrA = i
            idxMaxOverlapStrB = j
          }
        }
      }
      // Ignore last element in next cycle
      len--
      // If no overlap, append strArrCp[len] to strArrCp[0]
      if (max === -1) strArrCp[0] += strArrCp[len]
      else {
        // replace resultant string to index of word with max overlap
        strArrCp[idxMaxOverlapStrA] = resStr
        // replace string at last index to index r
        strArrCp[idxMaxOverlapStrB] = strArrCp[len]
      }
    }
    return strArrCp[0]
  }

  // calculate how much percentage the resultStr is shorter than all the sum
  // of all the letters in the input string array
  static getScore (strArr, resultStr) {
    const totalNbInputLetters = strArr.reduce((t, str) => t + str.length, 0)
    return ~~((1 - (resultStr.length / totalNbInputLetters)) * 100)
  }
}

module.exports = SuperString
