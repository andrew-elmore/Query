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

  update = (item) => {
    for (let i = 0, len = this.length; i < len; i += 1) {
        if (this[i].id === item.id) {
            this[i] = item;
        }
    }
    return this;
  };

  getFields = () => {
    const fields = {}
    this.forEach((item) => {
      const itemFields = item.getFields()
      itemFields.forEach((key) => {
        fields[key] = true
      })
    })
    return Object.keys(fields)
  }

  getRows = () => {
    return this.map((item) => {
      return item.getRow()
    })
  }

}