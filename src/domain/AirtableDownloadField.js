import BasicDomain from './BasicDomain'
import AirtableDownloadFieldArray from './AirtableDownloadFieldArray'

export default class AirtableDownloadField  extends BasicDomain{
  get getMyClass() { return AirtableDownloadField; }

  constructor(props = {}){
    super(props)
    this.id = props.id || null
    this.type = props.type || null
    this.name = props.name || null
    this.include = props.include || false
    this.linkedTable = props.linkedTable || null
    this.isLinked = props.isLinked || false
    this.linkedFields = new AirtableDownloadFieldArray(props.linkedFields || [])
  }

  setIncludeByIds = (ids, include) => {
    if (ids.length > 0) {
      const newArray = this.linkedFields.setIncludeByIds(ids, include)
      this.linkedFields = newArray
    } else {
      this.include = include
    }
  }

  getActionToken = () => {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      include: this.include,
      linkedTable: this.linkedTable,
      isLinked: this.isLinked,
      linkedFields: this.linkedFields.getActionToken()
    }
  } 
}