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

  getRecordsFromBase(base, useRecords) {
    const table = base.getTableById(this.table.id)
    const tlId2FieldId = table.fields.filter(t => t.name === 'TL_ID2')[0].id
    const records = [] 
    useRecords(table.selectRecords()).forEach((record) => {
      records.push({
        id: record.id,
        value: record.getCellValueAsString(this.airtableField.id),
        TL_ID2: record.getCellValueAsString(tlId2FieldId)
      })
    })
    return records
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

  resolveRecordAnd (recordResults) {
    const exactMatches = []
    const partialMatches = []
    const {allExactMatches, allPartialMatches} = this.flattenRecordResults(recordResults)

    console.log(':~:', __filename.split('/').pop(), 'method', 'allPartialMatches', allPartialMatches)
    console.log(':~:', __filename.split('/').pop(), 'method', 'allExactMatches', allExactMatches)
  }

  runWhere(csvRecords, base, useRecords) {
    const airtableRecords = this.getRecordsFromBase(base, useRecords)
    return csvRecords.map((csvRecord) => {
      const csvValue = csvRecord.currentFields[this.csvField]
      const exactMatches = this.findExactMatches(csvValue, airtableRecords)
      const partialMatches = this.findPartialMatches(csvValue, airtableRecords)
      return {csvRecord: csvRecord.getActionToken(), exactMatches, partialMatches}
    })
  }

  runAndOr(csvRecords, base, useRecords) {
    const subQuerysResults = this.subQuerys.map(subQuery => subQuery.run(csvRecords, base, useRecords))
    const recordsResults = [...csvRecords].map((record, idx) => {
      return [...subQuerysResults].map((subQueryResults) => {
        return subQueryResults[idx]
      })
    })
    if (this.type = 'AND') {
      recordsResults.map((recordResults) => { 
        return this.resolveRecordAnd(recordResults)
      })
    }

  }

  run(csvRecords, base, useRecords) {
    if (this.type === "WHERE") {
      return this.runWhere(csvRecords, base, useRecords)
    } else if (this.type === "OR" || this.type === "AND") {
      return this.runAndOr(csvRecords, base, useRecords)
    } else {
      throw ('Unsupported Query Type')
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