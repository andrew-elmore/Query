import BasicDomain from './BasicDomain'
import CsvRecord from './CsvRecord';

export default class Result  extends BasicDomain{
  get getMyClass() { return Result; }

  constructor(props = {}){
    super(props)
    this.csvId = props.csvId
    this.matches = props.matches || []
    this.table = props.table || null
    this.status = this.setStatus(props)
  }

  setStatus = (props) => {
    if (props.status) {
      return props.status
    }
    if (props.matches.length === 1) {
      return 'resolved'
    } else {
      return 'unresolved'
    }
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