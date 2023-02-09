const name = "VIEW"

export function addRow () {
  return {
    type: `${name}_ADD_ROW`
  }
}

export function removeRow (payload) {
  return {
    type: `${name}_REMOVE_ROW`,
    payload
  }
}

export function updateRow (payload) {
  return {
    type: `${name}_UPDATE_ROW`,
    payload
  }
}

export default {
  addRow,
  removeRow,
  updateRow
};
