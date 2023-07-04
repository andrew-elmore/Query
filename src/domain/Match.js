import BasicDomain from './BasicDomain'

export default class Match  extends BasicDomain{
  get myClass() { return Match; }

  constructor(props = {}){
    super(props)
    this.id = props.id
    this.csvId = props.csvId
    this.matches = props.matches || []
  }
}