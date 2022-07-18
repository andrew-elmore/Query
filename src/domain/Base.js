import BasicDomain from './BasicDomain'

export default class Base  extends BasicDomain{
  get myClass() { return Base; }

  constructor(props = {}){
    super(props)
    this.id = props.id || null
  }
}