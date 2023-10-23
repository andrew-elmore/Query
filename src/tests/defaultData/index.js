import Query from "../../domain/Query"
import CsvRecordArray from "../../domain/CsvRecordArray"
import ResultArray from "../../domain/ResultArray"
import QueryTableArray from "../../domain/QueryTableArray"

const testData = {
  


}
const currentTestSet = 'demo'

const sectionDomains = {
  appState: {
  },
  upload: {
    records: CsvRecordArray
  },
  query: {
    query: Query,
    results: ResultArray,
    queryTables: QueryTableArray
  },
  view: {

  }
}

// console.log(JSON.stringify(testData[currentTestSet].query.query))
// console.log(JSON.stringify(testData[currentTestSet].query.queryTables))

const getTestData = (slice) => {
  return false
  if (!testData[currentTestSet]) return {}
  if (slice === 'appState') {
    return {
      ...testData[currentTestSet][slice],
      base: false,
      tables: [],
      records: {}
    }
  } else {
    const assembledSlice = {}
    Object.entries(testData[currentTestSet][slice]).forEach(([sectionKey, sectionValues]) => {
      const sectionClass = sectionDomains[slice][sectionKey]
      if (sectionClass) {
        assembledSlice[sectionKey] = new sectionClass(sectionValues)
      } else {
        assembledSlice[sectionKey] = sectionValues
      }
    })
    return assembledSlice
  }
}

export default  getTestData