import BasicArray from './../../domain/BasicArray'
import Cell from './Cell'

export default class CellArray extends BasicArray {
  get myClass() { return CellArray; }
  get myItemClass() { return Cell; }

  constructor(items = []) {
    super(items)
  }
}