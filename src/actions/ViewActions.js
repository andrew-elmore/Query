const name = "VIEW"

export function update (payload) {
  return {
    type: `${name}_UPDATE`,
    payload
  }
}

export default {
  update
};
