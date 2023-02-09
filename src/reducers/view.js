import getTestData from "./../tests/defaultData"
import ViewArray from './../domain/ViewArray.js'

const sliceName = 'view'

const initState = getTestData(sliceName) || {
  view: new ViewArray()
}

const name = "VIEW"

export default (state = initState, action) => {
  switch (action.type) {
    case 'OVERIDE':
      return {
        ...action.payload[sliceName],
        ...state
      }
    case `${name}_ADD_ROW`:
      return {
        ...state,
        view: new ViewArray(state.view.add())
      }
    case `${name}_REMOVE_ROW`:
      return {
        ...state,
        view: new ViewArray(state.view.remove(action.payload))
      }
    case `${name}_UPDATE_ROW`:
      return {
        ...state,
        view: new ViewArray(state.view.update(action.payload))
      }
    default:
      return state;
    }
}