import BasicArray from './../../domain/BasicArray'
import Record from './Record'

export default class RecordArray extends BasicArray {
  get myClass() { return RecordArray; }
  get myItemClass() { return Record; }

  constructor(items = []) {
    super(items)
  }
}