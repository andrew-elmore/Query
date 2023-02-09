import Query from "../../domain/Query"
import CsvRecordArray from "../../domain/CsvRecordArray"
import ViewArray from "../../domain/ViewArray"

const testData = {
  testSet1: {"view": {view: {}}, "appState":{"tab":1},"records": {},"upload":{"records":[{"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"33424"},"currentFields":{"DISTB_ID":"33424"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"22344"},"currentFields":{"DISTB_ID":"22344"}}]}},
  testSet2: {"view": {view: {}}, "appState":{"tab":1},"records": {},"upload":{"records":[{"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"33424"},"currentFields":{"DISTB_ID":"33424"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"22344"},"currentFields":{"DISTB_ID":"22344"}}]},"query":{"query":{"id":1658191068337,"type":"WHERE","subQuerys":[],"table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},"airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},"rule":"contains","csvField":"DISTB_ID"}}},
  testSet3: {"view": {view: {}}, "appState":{"tab":2},"records": {},"upload":{"records":[{"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"33424"},"currentFields":{"DISTB_ID":"33424"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"22344"},"currentFields":{"DISTB_ID":"22344"}}]},"query":{"query":{"id":1658191068337,"type":"WHERE","subQuerys":[],"table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},"airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},"rule":"contains","csvField":"DISTB_ID"}}},
  testSet4: {"view": {view: {}}, "appState":{"tab":2},"records": {},"upload":{"records":[{"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"33424"},"currentFields":{"DISTB_ID":"33424"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"22344"},"currentFields":{"DISTB_ID":"22344"}}]},"query":{"query":{"id":1658191068337,"type":"WHERE","subQuerys":[],"table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},"airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},"rule":"contains","csvField":"DISTB_ID"}}},

}

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
  const currentTestSet = 'testSet4'
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