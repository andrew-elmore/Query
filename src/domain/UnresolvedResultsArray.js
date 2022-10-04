import BasicArray from './BasicArray'
import ResultArray from './ResultArray'

export default class UnresolvedResultsArray extends BasicArray {
  get myClass() { return UnresolvedResultsArray; }
  get myItemClass() { return ResultArray; }

  constructor(items = []) {
    super(items)
    this.numberOfQuerys = items.length
    this.numberOfCSVRecords = items[0].length
  }

  resolveAndQuery () {
    const resolved = new ResultArray()
    for (let csvRecordIdx = 0; csvRecordIdx < this.numberOfCSVRecords; csvRecordIdx++) {
      const csvRecord = this[0][csvRecordIdx].csvRecord
      let allExactMatches = {}
      let allPartialMatches = {}

      for (let queryResultIdx = 0; queryResultIdx < this.numberOfQuerys; queryResultIdx++) {
        const result = this[queryResultIdx][csvRecordIdx]
        result.exactMatches.forEach((match) => {
          allExactMatches[match['TL_ID2']] = match
        })
        result.partialMatches.forEach((match) => {
          allPartialMatches[match['TL_ID2']] = match
        })
      }

      let exactMatches = Object.values(allExactMatches).filter((match) => {
        return this.every((queryResults) => {
          return queryResults[csvRecordIdx].getExactMatchesTlIds().includes(match['TL_ID2'])
        })
      })
      let partialMatches = Object.values(allPartialMatches).filter((match) => {
        return this.every((queryResults) => {
          return queryResults[csvRecordIdx].getPartialMatchesTlIds().includes(match['TL_ID2'])
        })
      })

      resolved.add({
        csvRecord,
        exactMatches,
        partialMatches
      })
    }
    return resolved
  }
  resolveOrQuery () {
    const resolved = new ResultArray()
    for (let csvRecordIdx = 0; csvRecordIdx < this.numberOfCSVRecords; csvRecordIdx++) {
      const csvRecord = this[0][csvRecordIdx].csvRecord
      let allExactMatches = {}
      let allPartialMatches = {}

      for (let queryResultIdx = 0; queryResultIdx < this.numberOfQuerys; queryResultIdx++) {
        const result = this[queryResultIdx][csvRecordIdx]
        result.exactMatches.forEach((match) => {
          allExactMatches[match['TL_ID2']] = match
        })
        result.partialMatches.forEach((match) => {
          allPartialMatches[match['TL_ID2']] = match
        })
      }

      let exactMatches = Object.values(allExactMatches)
      let partialMatches = Object.values(allPartialMatches)

      resolved.add({
        csvRecord,
        exactMatches,
        partialMatches
      })
    }
    return resolved
  }


}