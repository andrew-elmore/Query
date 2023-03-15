import BasicDomain from './BasicDomain'

export default class CsvRecord  extends BasicDomain{
  get myClass() { return CsvRecord; }

  constructor(props = {}){
    super(props)
    this.id = props.id || Math.floor(Math.random() * 1000000000000)
    this.originalFields = props.originalFields || []
    this.currentFields = props.originalFields || this.originalFields
  }

  getActionToken = () => {
    return {
      id: this.id,
      originalFields: this.originalFields,
      currentFields: this.currentFields
    }
  }
}