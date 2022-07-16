const testData = {
  testSet1: {"appState":{"tab":1},"upload":{"records":[{"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"33424"},"currentFields":{"DISTB_ID":"33424"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"22344"},"currentFields":{"DISTB_ID":"22344"}}]}}
}

const getTestData = (slice) => {
  const currentTestSet = 'testSet1'
  if (slice === 'appState') {
    return {
      ...testData[currentTestSet][slice],
      base: {},
      tables: []
    }
  }
  return testData[currentTestSet][slice]
}

export default  getTestData