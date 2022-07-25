import BasicDomain from './../../domain/BasicDomain'
import CellArray from './CellArray';

export default class Record  extends BasicDomain{
  get getMyClass() { return Record; }

  constructor(props = {}){
    super(props)
    this.id = props.id || null
    this.cells = new CellArray(props.cells)
  }

  getCellValueAsString(id) {
    return this.cells.get(id).value
  }
}