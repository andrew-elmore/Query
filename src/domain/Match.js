import BasicDomain from './BasicDomain'

export default class Match  extends BasicDomain{
  get myClass() { return Match; }

  constructor(props = {}){
    super(props)
    this.id = props.id || null
    this.csvId = props.csvId || null
    this.matches = props.matches || []
  }
}