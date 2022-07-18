import BasicDomain from './BasicDomain'
import QueryArray from './QueryArray'

export default class Query  extends BasicDomain{
  get myClass() { return Query; }

  constructor(props = {}){
    super(props)
    this.id = props.id || (new Date()).getTime()
    this.type = props.type || 'where'
    this.subQuerys = new QueryArray(props.subQuerys)
    this.table = props.table || null
    this.airtableField = props.airtableField || null
    this.rule = props.rule || 'contains'
    this.csvField = props.csvField || null
  }

  updateQuery(updateToken) {
    console.log(':~:', __filename.split('/').pop(), 'method', 'updateToken', updateToken)
    const newQuery = this.clone()
    if (this.type === 'where') {
      newQuery[updateToken.field] = updateToken.value
      return newQuery
    } else {
      // const ids = updateToken.ids
      // const currentId = ids.pop()
      // const newSubQueryItems = 
      // newQuery.subQuerys.update()
    }
  }
}