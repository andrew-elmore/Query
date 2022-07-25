import BasicDomain from './../../domain/BasicDomain'
import RecordArray from './RecordArray'
export default class Table  extends BasicDomain{
  get getMyClass() { return Table; }

  constructor(props = {}){
    super(props)
    this.id = props.id || null
    this.name = props.name || ''
    this.fields = props.fields || []
    this.records = new RecordArray(props.records)
  }

  selectRecords(){
    return this.records
  }
}