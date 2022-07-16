import BasicDomain from './BasicDomain'

export default class CsvRecord  extends BasicDomain{
  get getMyClass() { return CsvRecord; }

  constructor(props = {}){
    super(props)
    this.id = props.id || (new Date()).getTime()
    this.originalFields = props.originalFields || []
    this.currentFields = props.originalFields || this.originalFields
  }
}