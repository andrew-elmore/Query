import BasicArray from './BasicArray'
import CsvRecord from './CsvRecord'

export default class CsvRecordArray extends BasicArray {
  get myClass() { return CsvRecordArray; }
  get myItemClass() { return CsvRecord; }

  constructor(items = []) {
    super(items)
  }

  removeEmptyRecords = () => {
    const newRecords = this.clone()
    return newRecords.filter((i) => {
      return !i.isEmpty()
    })
  }
}