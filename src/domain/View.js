import BasicDomain from './BasicDomain'

export default class View  extends BasicDomain{
  get getMyClass() { return View; }

  constructor(props = {}){
    super(props)
    this.id = props.id || null
    this.csvField = props.csvField || null
    this.airtableField = props.airtableField || null
    this.searchable = props.searchable || false
  }
}