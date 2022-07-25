import BasicDomain from './../../domain/BasicDomain'
import CellArray from './CellArray';

export default class Record  extends BasicDomain{
  get getMyClass() { return Record; }

  constructor(props = {}){
    super(props)
    this.id = props.id || null
    this.cells = props.cells
  }

  getCellValue(id) {
    return this.cells[id]
  }
}