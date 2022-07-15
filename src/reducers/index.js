const reducers = (state, action) => {
  return {...state, [action.type]: action.value}
}

export default reducers