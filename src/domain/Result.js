import BasicDomain from './BasicDomain'
import CsvRecord from './CsvRecord';

export default class Result  extends BasicDomain{
  get getMyClass() { return Result; }

  constructor(props = {}){
    if (props.csvId === 0) {
      console.log(props.csvId, props.matches.length, props.status)
    }
    super(props)
    this.csvId = props.csvId
    this.matches = props.matches || []
    this.table = props.table || null
    this.status = props.matches.length === 1 ? 'resolved' : 'unresolved'
  }

  getActionToken = () => {
    return {
      csvId: this.csvId,
      matches: this.matches,
      table: this.table,
      status: this.status
    }
  };
}