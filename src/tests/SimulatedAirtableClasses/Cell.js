import BasicDomain from './../../domain/BasicDomain'

export default class Cell  extends BasicDomain{
  get getMyClass() { return Cell; }

  constructor(props = {}){
    super(props)
    this.id = props.id || null
    this.value = props.value
  }
}