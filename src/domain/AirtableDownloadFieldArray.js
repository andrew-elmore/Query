import BasicArray from './BasicArray'
import AirtableDownloadField from './AirtableDownloadField'

export default class AirtableDownloadFieldArray extends BasicArray {
  get myClass() { return AirtableDownloadFieldArray; }
  get myItemClass() { return AirtableDownloadField; }

  constructor(items = []) {
    super(items)
  }

  setIncludeByIds = (ids, include) => {
    const newArray = this.clone()
    let currentLevelId = ids.shift()
    let item = newArray.get(currentLevelId)
    item.setIncludeByIds(ids, include)
    return newArray
  }

  setLinkedFieldsById = (id, linkedFields) => {
    const newArray = this.clone()
    const item = newArray.get(id)
    item.linkedFields = linkedFields
    return newArray
  }
}