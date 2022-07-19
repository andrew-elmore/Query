import BasicArray from './BasicArray'
import Query from './Query'

export default class QueryArray extends BasicArray {
  get myClass() { return QueryArray; }
  get myItemClass() { return Query; }

  constructor(items = []) {
    super(items)
  }

  getActionToken(){
    console.log(':~:', __filename.split('/').pop(), 'method', 'this', this)
    return this.map(query => query.getActionToken())
  }
}