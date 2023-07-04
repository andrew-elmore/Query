import BasicDomain from './BasicDomain'
import CsvRecord from './CsvRecord';

export default class Result  extends BasicDomain{
  get getMyClass() { return Result; }

  constructor(props = {}){
    super(props)
    this.id = props.id
    this.csvId = props.csvId
    this.matches = props.matches || []
    this.table = props.table || null
  }

  getActionToken = () => {
    return {
      id: this.id,
      csvId: this.csvId,
      matches: this.matches,
      table: this.table,
    }
  };
}