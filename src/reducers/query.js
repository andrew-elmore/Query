import getTestData from "../tests/testData/data"
import Query from "./../domain/Query"


const initState = getTestData('query') || {
  query: new Query()
}

const name = 'QUERY'
export default (state = initState, action) => {
  switch (action.type) {
    case `${name}_SET`:
      return {
        ...state,
        query: new Query(action.payload)
      }
    case `${name}_UPDATE`:
      return {
        ...state,
        query: state.query.updateQuery(action.payload)
      }
  
    default:
      return state;
  }
}