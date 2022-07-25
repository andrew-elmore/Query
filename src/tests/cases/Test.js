import BasicDomain from './../../domain/BasicDomain'

export default class Test  extends BasicDomain{
  get getMyClass() { return Test; }

  constructor(props = {}){
    super(props)
    this.id = props.id || (new Date()).getTime()
    this.title = props.title || ''
    this.storeData = props.storeData || {}
  }
}