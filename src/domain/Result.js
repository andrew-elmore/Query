import BasicDomain from './BasicDomain'
import CsvRecord from './CsvRecord';

export default class Result  extends BasicDomain{
  get getMyClass() { return Result; }

  constructor(props = {}){
    super(props)
    this.id = props.id || (new Date()).getTime()
    this.csvId = props.csvId || null
    this.queryId = props.queryId || null
    this.matches = props.matches || []
    this.table = props.table || null
  }


  populateLinks = (results) => {
    const newResults = this.clone().map((result) => {
      return result.populateLinks(this)
    })
    return newResults
  }

}