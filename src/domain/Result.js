import BasicDomain from './BasicDomain'
import CsvRecord from './CsvRecord';

export default class Result  extends BasicDomain{
  get getMyClass() { return Result; }

  constructor(props = {}){
    super(props)
    this.id = props.id
    this.csvId = props.csvId
    this.queryId = props.queryId || null
    this.matches = props.matches || []
    this.table = props.table || null
  }
}