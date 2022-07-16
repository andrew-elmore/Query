import testData from './../tests/testData/data'
import getTestData from "../tests/testData/data"

const initState = getTestData('appState') || {
  tab: 0,
  base: {},
  tables: []
}

const sliceName = 'appState'
export default (state = initState, action) => {
  switch (action.type) {
    case 'OVERIDE':
      return {
        ...action.payload[sliceName],
        ...state
      }
    case 'INIT':
      return {
        ...state,
        ['base']: action.payload.base,
        ['tables']: action.payload.tables,
      }
    case 'SET_TABLE':
      return {
        ...state,
        ['tab']: action.payload
      }
      break;
  
    default:
      return state;
  }
}