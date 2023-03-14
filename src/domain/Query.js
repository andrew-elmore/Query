import BasicDomain from './BasicDomain'
import QueryArray from './QueryArray'
import ResultArray from './ResultArray'
import Result from './Result'
import UnresolvedResultsArray from './UnresolvedResultsArray'

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

  getRecordsFromBase(base, records) {
    const table = base.getTableById(this.table.id)
    const tlId2FieldId = table.fields.filter(t => t.name === 'TL_ID2')[0].id
    const selectedRecords = [] 
    records[table._id].forEach((record) => {
      selectedRecords.push({
        id: record.id,
        value: record.getCellValueAsString(this.airtableField.id),
        TL_ID2: record.getCellValueAsString(tlId2FieldId),
        record
      })
    })
    return selectedRecords
  }

  findExactMatches(csvValue, airtableRecords) {
    return airtableRecords.filter((airtableRecord) => {
      return airtableRecord.value === csvValue
    })
  }

  findPartialMatches(csvValue, airtableRecords) {
    return airtableRecords.filter((airtableRecord) => {
      return airtableRecord.value.includes(csvValue)
    })
  }

  flattenRecordResults (recordResults) {
    const allExactMatchesObject = {}
    const allPartialMatchesObject = {}
    recordResults.forEach((recordResult) => {
      recordResult.exactMatches.forEach((exactMatch) => {
        allExactMatchesObject[JSON.stringify(exactMatch)] = true
      })
      recordResult.partialMatches.forEach((partialMatch) => {
        allPartialMatchesObject[JSON.stringify(partialMatch)] = true
      })
    })
    const allExactMatches = Object.keys(allExactMatchesObject).map(e => JSON.parse(e))
    const allPartialMatches = Object.keys(allPartialMatchesObject).map(e => JSON.parse(e))
    return {
      allExactMatches,
      allPartialMatches
    }
  }

  runWhere(csvRecords, base, records) {
    const airtableRecords = this.getRecordsFromBase(base, records)
    return csvRecords.map((csvRecord) => {
      const csvValue = csvRecord.currentFields[this.csvField]
      const exactMatches = this.findExactMatches(csvValue, airtableRecords)
      const partialMatches = this.findPartialMatches(csvValue, airtableRecords)
      return new Result({csvRecord: csvRecord.getActionToken(), exactMatches, partialMatches})
    })
  }

  runAndOr(csvRecords, base, records) {
    const unresolvedRecords = new UnresolvedResultsArray(this.subQuerys.map(subQuery => subQuery.run(csvRecords, base, records)))
    if (this.type === "AND") {
      return unresolvedRecords.resolveAndQuery()
    } else if (this.type === "OR") {
      return unresolvedRecords.resolveOrQuery()
    }
  }

  run(csvRecords, base, records) {
    if (this.type === "WHERE") {
      return new ResultArray(this.runWhere(csvRecords, base, records))
    } else if (this.type === "OR" || this.type === "AND") {
      return this.runAndOr(csvRecords, base, records)
    } else {
      throw ('Unsupported Query Type')
    }
  }

  getQueryToken = (csvRecords) => {
    console.log(':~:', __filename.split('/').pop(), 'method', 'csvRecords', csvRecords)
    console.log(':~:', __filename.split('/').pop(), 'method', 'this.airtableField', this.airtableField)
    if (this.type === "WHERE") {
      return csvRecords.currentFields[this.csvField]? {
        url: `FIND("${csvRecords.currentFields[this.csvField]}",{${this.airtableField.label}})`,
        table: this.table,
      } : false
    } else if (this.type === "OR" || this.type === "AND") {
      const subQueryTokens = this.subQuerys
        .map(subQuery => subQuery.getQueryToken(csvRecords))
        .filter(t => t)
        .join(`,`)
      return {
        url: `${this.type}(${subQueryTokens})`,
        table: this.table,
      }
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