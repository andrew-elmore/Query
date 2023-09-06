import getTestData from "./../tests/defaultData"

const sliceName = 'appState'

const initState = getTestData(sliceName) || {
  tab: 0,
  base: {},
  tables: [],
  records: {}
}

export default (state = initState, action) => {
  switch (action.type) {
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
    case 'ADD_RECORDS':
      return {
        ...state,
        ['records']: {
          ...state.records,
          ...action.payload
        }
      }
      break;
    default:
      return state;
  }
}