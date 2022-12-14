import getTestData from "./../tests/defaultData"

const sliceName = 'appState'

const initState = getTestData(sliceName) || {
  tab: 0,
  base: {},
  tables: []
}

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