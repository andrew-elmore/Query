import BasicArray from './BasicArray'
import QueryTables from './QueryTables'

export default class QueryTablesArray extends BasicArray {
  get myClass() { return QueryTablesArray; }
  get myItemClass() { return QueryTables; }

  constructor(items = []) {
    super(items)
  }

  includesById = (id) => {
    return !!this.filter((i) => {
      return i.id === id
    }).length
  }

  getActionToken = () => {
    return [...this].map(i => i.getActionToken())
  }

  getFields = () => {
    const allFields = {}
    this.forEach((i) => {
      i.fields.forEach((f) => {
        allFields[f.name] = f
      })
    })
    const fields = []
    Object.keys(allFields).forEach((name) => {
      const isInAll = this.every((i) => {
        return !!i.fields.filter((field) => field.name === name).length
      })
      if (isInAll) {
        fields.push(name)
      }
    })
    return fields
  }
}