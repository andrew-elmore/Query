import BasicArray from './BasicArray'
import Query from './Query'

export default class QueryArray extends BasicArray {
  get myClass() { return QueryArray; }
  get myItemClass() { return Query; }

  constructor(items = []) {
    super(items)
  }

  getActionToken(){
    return this.map(query => query.getActionToken())
  }
}