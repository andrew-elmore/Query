import BasicDomain from './BasicDomain'
import QueryArray from './QueryArray'
import ResultArray from './ResultArray'
import MatchArray from './MatchArray'

export default class Query  extends BasicDomain{
  get myClass() { return Query; }

  constructor(props = {}){
    super(props)
    this.id = props.id || (new Date()).getTime()
    this.type = props.type || 'WHERE'
    this.subQuerys = new QueryArray(props.subQuerys)
    this.table = props.table || null
    this.tables = props.tables || []
    this.airtableField = props.airtableField || null
    this.rule = props.rule || 'contains'
    this.csvField = props.csvField || null
  }

  getTables () {
    if (this.type === "WHERE") {
      return [this.table]
    } else if (this.type === "OR" || this.type === "AND") {
      return this.subQuerys.map((sub) => {
        return [...sub.getTables()]
      })
    } else {
      throw ('Unsupported Query Type')
    }
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

  cleanString = (string) => {
    return string.replace(/[^a-zA-Z0-9-]/g, "").trim();
  }

  getQueryToken = (csvRecord, queryTables) => {
    console.log(':~:', queryTables)
    return {
      csvId: csvRecord.id,
      url: this.getQueryTokenUrl(csvRecord),
      table: {id: 'tblGjRvH8jh5y1M4V', label: 'MDF'}
    }
  }

  getQueryTokenUrl = (csvRecord) => {
    if (this.type === "WHERE") {
      return csvRecord.currentFields[this.csvField]? 
        `FIND("${this.cleanString(csvRecord.currentFields[this.csvField])}",{${this.airtableField.label}})`
        : ''
    } else {
      const subqueryTokens = this.subQuerys.map((subQuery) => {
        return subQuery.getQueryTokenUrl(csvRecord)
      }).join(', ')
      return subqueryTokens? `${this.type}(${subqueryTokens})` : false
    }
  }

  getViewFields = () => {
    if (this.type === "WHERE") {
      return {[this.airtableField.label]: this.csvField}
    } else {
      return this.subQuerys.map((subQuery) => {
        return subQuery.getViewFields()
      }).flat()
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