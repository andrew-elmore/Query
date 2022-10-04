import BasicDomain from './BasicDomain'
import CsvRecord from './CsvRecord';

export default class Result  extends BasicDomain{
  get getMyClass() { return Result; }

  constructor(props = {}){
    super(props)
    this.id = props.id || (new Date()).getTime()
    this.csvRecord = new CsvRecord(props.csvRecord)
    this.exactMatches = props.exactMatches || []
    this.partialMatches = props.partialMatches || []
    this.match = this.findMatch()
  }

  findMatch () {
    if (this.exactMatches.length === 1) {
      return this.exactMatches[0]
    } else if (this.partialMatches.length + this.exactMatches.length === 1) {
      return this.partialMatches[0]
    } else {
      return false
    }
  }

  getExactMatchesTlIds () {
    return this.exactMatches.map(match =>  match['TL_ID2'])
  }
  getPartialMatchesTlIds () {
    return this.partialMatches.map(match =>  match['TL_ID2'])
  }
}