import BasicDomain from './BasicDomain'

export default class View  extends BasicDomain{
  get getMyClass() { return View; }

  constructor(props = {}){
    super(props)
    this.id = props.id || (new Date()).getTime()
    this.airtableField = props.airtableField || null
    this.csvField = props.csvField || null
    this.required = props.required || false
  }
}