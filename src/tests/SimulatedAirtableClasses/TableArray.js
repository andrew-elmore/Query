import BasicArray from './../../domain/BasicArray'
import Table from './Table'

export default class TableArray extends BasicArray {
  get myClass() { return TableArray; }
  get myItemClass() { return Table; }

  constructor(items = []) {
    super(items)
  }
}