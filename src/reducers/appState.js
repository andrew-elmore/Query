const initState = {
  tab: 0,
  base: {},
  tables: []
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
  
    default:
      return state;
  }
}