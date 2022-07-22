import BasicDomain from './BasicDomain'
import QueryArray from './QueryArray'

export default class Query  extends BasicDomain{
  get myClass() { return Query; }

  constructor(props = {}){
    super(props)
    this.id = props.id || (new Date()).getTime()
    this.type = props.type || 'WHERE'
    this.subQuerys = new QueryArray(props.subQuerys)
    this.table = props.table || null
    this.airtableField = props.airtableField || null
    this.rule = props.rule || 'contains'
    this.csvField = props.csvField || null
  }

  updateQuery(updateToken) {
    const newQuery = this.clone()
    const ids = [...updateToken.ids]
    ids.shift()
    if (ids.length === 0) {
      if (updateToken.field === 'type') {
        return new Query({type: updateToken.value, id: this.id})
      } else {
        newQuery[updateToken.field] = updateToken.value
        return newQuery
      }
    } else {
      const subQueryItem = newQuery.subQuerys.get(ids[0])
      const newSubQueryItem = subQueryItem.updateQuery({
        ...updateToken,
        ids
      })
      newQuery.subQuerys.update(newSubQueryItem)
      return newQuery
    }
  }
  
  addQuery(updateToken) {
    const newQuery = this.clone()
    const ids = [...updateToken.ids]
    ids.shift()
    if (ids.length === 0) {
      newQuery.subQuerys.push(new Query(updateToken.queryProps))
      return newQuery
    } else {
      const subQueryItem = newQuery.subQuerys.get(ids[0])
      const newSubQueryItem = subQueryItem.addQuery({
        ...updateToken,
        ids
      })
      newQuery.subQuerys.update(newSubQueryItem)
      return newQuery
    }
  }

  removeQuery(updateToken) {
    const newQuery = this.clone()
    const ids = [...updateToken.ids]
    if (ids.length === 2) {
      const idToRemove =  ids[1]
      newQuery.subQuerys = newQuery.subQuerys.filter(q => q.id !== idToRemove)
      return newQuery
    } else {
      const subQueryItem = newQuery.subQuerys.get(ids[1])
      const newSubQueryItem = subQueryItem.removeQuery({
        ids: ids.slice(1)
      })
      newQuery.subQuerys.update(newSubQueryItem)
      newQuery[updateToken.field] = updateToken.value
      return newQuery
    }
  }

  getActionToken = () => {
    return {
      id: this.id,
      type: this.type,
      subQuerys: this.subQuerys.getActionToken(),
      table: this.table,
      airtableField: this.airtableField,
      rule: this.rule,
      csvField: this.csvField,
    }
  }
}