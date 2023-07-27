import BasicArray from './BasicArray'
import Result from './Result'

export default class ResultArray extends BasicArray {
  get myClass() { return ResultArray; }
  get myItemClass() { return Result; }

  constructor(items = []) {
    super(items)
  }

  update = (item) => {
    const c = this.clone()
    for (let i = 0, len = c.length; i < len; i += 1) {
      console.log(c[i].csvId, item.csvId)
      if (c[i].csvId === item.csvId) {
        c[i] = item;
      }
    }
    return c;
  };

  getMatches(csvId) {
    return this.filter((result) => {
      return result.csvId === csvId
    })
  }
}