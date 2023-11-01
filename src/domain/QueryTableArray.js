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

  getLinkedFields = () => {
    const allFields = {}
    this.forEach((i) => {
      i.fields.forEach((f) => {
        allFields[f.name] = f
      })
    })
    const fields = []
    Object.values(allFields).forEach((f) => {
      const isInAll = this.every((i) => {
        return !!i.fields.filter((field) => {
          return field.name === f.name && field.linkedTable
        }).length
      })
      if (isInAll) {
        fields.push(f)
      }
    })
    return fields
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