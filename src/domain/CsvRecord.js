import BasicDomain from './BasicDomain'

export default class CsvRecord  extends BasicDomain{
  get myClass() { return CsvRecord; }

  constructor(props = {}){
    super(props)
    this.id = props.id
    this.originalFields = props.originalFields || {}
    this.currentFields = props.originalFields || this.originalFields
  }

  isEmpty = () => {
    return Object.values(this.originalFields).every((field) => {
      return field === ''
    })
  }

  getFields = () => {
    return Object.keys(this.originalFields)
  }

  getRow = () => {
    return this.originalFields
  }

  getActionToken = () => {
    return {
      id: this.id,
      originalFields: this.originalFields,
      currentFields: this.currentFields
    }
  }
}