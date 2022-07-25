import BasicDomain from './../../domain/BasicDomain'
import TableArray from './TableArray'

export default class Base  extends BasicDomain{
  get getMyClass() { return Base; }

  constructor(props = {}){
    super(props)
    this.id = props.id || null
    this.name = props.name || ''
    this.tables = new TableArray(props.tables)
  }

  getTableById(id) {
    return this.tables.get(id)
  }
}