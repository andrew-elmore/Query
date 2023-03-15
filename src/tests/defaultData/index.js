import Query from "../../domain/Query"
import CsvRecordArray from "../../domain/CsvRecordArray"
import ViewArray from "../../domain/ViewArray"
import ResultArray from "../../domain/ResultArray"
import MatchArray from "../../domain/MatchArray"

const testData = {
  testSet1: {"view": {view: {}}, "appState":{"tab":1},"records": {},"upload":{"records":[{"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"33424"},"currentFields":{"DISTB_ID":"33424"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"22344"},"currentFields":{"DISTB_ID":"22344"}}]}},
  testSet2: {"view": {view: {}}, "appState":{"tab":1},"records": {},"upload":{"records":[{"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"33424"},"currentFields":{"DISTB_ID":"33424"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"22344"},"currentFields":{"DISTB_ID":"22344"}}]},"query":{"query":{"id":1658191068337,"type":"WHERE","subQuerys":[],"table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},"airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},"rule":"contains","csvField":"DISTB_ID"}}},
  testSet3: {"view": {view: {}}, "appState":{"tab":2},"records": {},"upload":{"records":[{"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"33424"},"currentFields":{"DISTB_ID":"33424"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"22344"},"currentFields":{"DISTB_ID":"22344"}}]},"query":{"query":{"id":1658191068337,"type":"WHERE","subQuerys":[],"table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},"airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},"rule":"contains","csvField":"DISTB_ID"}}},
  testSet4: {"view": {view: new ViewArray()}, "appState":{"tab":1},"records": {},"upload":{"records":[{"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"33424"},"currentFields":{"DISTB_ID":"33424"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"22344"},"currentFields":{"DISTB_ID":"22344"}}]},"query":{"query":{"id":1658191068337,"type":"WHERE","subQuerys":[],"table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},"airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},"rule":"contains","csvField":"DISTB_ID"}}},
  testSet5: {"appState":{"tab":1,"records":{}},"upload":{"records":[{"id":300494551456,"originalFields":{"DISTB_ID":"223441","UPC":"446908180895"},"currentFields":{"DISTB_ID":"223441","UPC":"446908180895"}},{"id":687750209630,"originalFields":{"DISTB_ID":"223440","UPC":"506810422326"},"currentFields":{"DISTB_ID":"223440","UPC":"506810422326"}},{"id":478779259335,"originalFields":{"DISTB_ID":"23445","UPC":"848643118779"},"currentFields":{"DISTB_ID":"23445","UPC":"848643118779"}},{"id":738556321512,"originalFields":{"DISTB_ID":"861627","UPC":"458043890998"},"currentFields":{"DISTB_ID":"861627","UPC":"458043890998"}},{"id":18917651535,"originalFields":{"DISTB_ID":"626599","UPC":"195344736479"},"currentFields":{"DISTB_ID":"626599","UPC":"195344736479"}},{"id":846925899891,"originalFields":{"DISTB_ID":"680252","UPC":"101158688165"},"currentFields":{"DISTB_ID":"680252","UPC":"101158688165"}},{"id":31044466401,"originalFields":{"DISTB_ID":"459477","UPC":"114998289033"},"currentFields":{"DISTB_ID":"459477","UPC":"114998289033"}},{"id":728600549350,"originalFields":{"DISTB_ID":"914702","UPC":"657377988129"},"currentFields":{"DISTB_ID":"914702","UPC":"657377988129"}},{"id":21287526943,"originalFields":{"DISTB_ID":"384067","UPC":"983716381005"},"currentFields":{"DISTB_ID":"384067","UPC":"983716381005"}},{"id":490954370401,"originalFields":{"DISTB_ID":"531531","UPC":"214306342841"},"currentFields":{"DISTB_ID":"531531","UPC":"214306342841"}},{"id":839651546527,"originalFields":{"DISTB_ID":"875455","UPC":"448952652869"},"currentFields":{"DISTB_ID":"875455","UPC":"448952652869"}},{"id":105361305942,"originalFields":{"DISTB_ID":"109659","UPC":"480952780926"},"currentFields":{"DISTB_ID":"109659","UPC":"480952780926"}},{"id":948198347685,"originalFields":{"DISTB_ID":"742805","UPC":"106455888439"},"currentFields":{"DISTB_ID":"742805","UPC":"106455888439"}},{"id":329539863438,"originalFields":{"DISTB_ID":"563403","UPC":"107957487477"},"currentFields":{"DISTB_ID":"563403","UPC":"107957487477"}},{"id":31971536021,"originalFields":{"DISTB_ID":"202617","UPC":"953166633871"},"currentFields":{"DISTB_ID":"202617","UPC":"953166633871"}},{"id":677218191874,"originalFields":{"DISTB_ID":"103343","UPC":"304962506311"},"currentFields":{"DISTB_ID":"103343","UPC":"304962506311"}},{"id":925510917614,"originalFields":{"DISTB_ID":"912270","UPC":"685778405285"},"currentFields":{"DISTB_ID":"912270","UPC":"685778405285"}},{"id":936643800915,"originalFields":{"DISTB_ID":"349457","UPC":"210099020786"},"currentFields":{"DISTB_ID":"349457","UPC":"210099020786"}},{"id":128434555504,"originalFields":{"DISTB_ID":"796841","UPC":"898106260838"},"currentFields":{"DISTB_ID":"796841","UPC":"898106260838"}},{"id":618248738994,"originalFields":{"DISTB_ID":"106489","UPC":"234614877516"},"currentFields":{"DISTB_ID":"106489","UPC":"234614877516"}},{"id":666285643451,"originalFields":{"DISTB_ID":"641594","UPC":"328958542641"},"currentFields":{"DISTB_ID":"641594","UPC":"328958542641"}},{"id":988388632342,"originalFields":{"DISTB_ID":"569092","UPC":"926447202274"},"currentFields":{"DISTB_ID":"569092","UPC":"926447202274"}},{"id":380328680759,"originalFields":{"DISTB_ID":"431913","UPC":"687740516964"},"currentFields":{"DISTB_ID":"431913","UPC":"687740516964"}},{"id":163767780044,"originalFields":{"DISTB_ID":"105454","UPC":"229055981611"},"currentFields":{"DISTB_ID":"105454","UPC":"229055981611"}},{"id":867527674257,"originalFields":{"DISTB_ID":"760934","UPC":"950689177117"},"currentFields":{"DISTB_ID":"760934","UPC":"950689177117"}}]},"query":{"progress": null, "results": new ResultArray(), "matches": new MatchArray(), "query":{"id":1658191068337,"type":"AND","subQuerys":[{"id":1678837009989,"type":"WHERE","subQuerys":[],"table":{"id":"tblUw8ihYgeWh47N8","label":"Products"},"airtableField":{"id":"fldrTqeM5Sp158Xqq","label":"UNFI"},"rule":"contains","csvField":"DISTB_ID"},{"id":1678837022857,"type":"WHERE","subQuerys":[],"table":{"id":"tblUw8ihYgeWh47N8","label":"Products"},"airtableField":{"id":"fldrTqeM5Sp158Xqq","label":"UNFI"},"rule":"contains","csvField":"UPC"}],"table":null,"airtableField":null,"rule":"contains","csvField":null}},"view":{"view":[]}}
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
  const currentTestSet = 'testSet5'
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