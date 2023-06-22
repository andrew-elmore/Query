import Query from "../../domain/Query"
import CsvRecordArray from "../../domain/CsvRecordArray"
import ViewArray from "../../domain/ViewArray"
import ResultArray from "../../domain/ResultArray"
import MatchArray from "../../domain/MatchArray"

const testData = {
  default: {"appState":{"tab":0},"upload":{},"query":{"results":[],"matches":[],"data":0,"progress":null,"pendingRequestCount":0,"fulfilledRequestCount":0},"view":{}}
}
const currentTestSet = 'default'

const sectionDomains = {
  appState: {
  },
  upload: {
    records: CsvRecordArray
  },
  query: {
    query: Query,
  },
  view: {
    view: ViewArray,
  },
}


const getTestData = (slice) => {
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