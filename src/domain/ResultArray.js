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
      if (c[i].csvId === item.csvId) {
        c[i] = new Result(item);
      }
    }
    return c;
  };

  addOrUpdate = (item) => {
    const matchCount = this.filter((result) => {
      return result.csvId === item.csvId
    }).length
    if (matchCount > 0) {
      return this.update(item)
    } else {
      return this.add(item)
    }
  }

  getMatches(csvId) {
    return this.filter((result) => {
      return result.csvId === csvId
    })
  }
}