import Query from './Query'

export default class QueryWhere  extends Query{
  get myClass() { return QueryWhere; }

  constructor(props = {}){
    super(props)
    this.table = props.table || null
    this.airtableField = props.airtableField || null
    this.rule = props.rule || 'contains'
    this.csvField = props.csvField || null
  }
}