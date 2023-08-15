import BasicDomain from './BasicDomain'

export default class QueryTables  extends BasicDomain{
  get getMyClass() { return QueryTables; }

  constructor(props = {}){
    super(props)
    this.id = props.id || null
    this.fields = props.fields || []
    this.name = props.name || ''
  }

  getActionToken = () => {
    return ({
      id: this.id,
      fields: this.fields,
      name: this.name
    })
  }
}