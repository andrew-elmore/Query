import BasicArray from './BasicArray'
import Result from './Result'

export default class ResultArray extends BasicArray {
  get myClass() { return ResultArray; }
  get myItemClass() { return Result; }

  constructor(items = []) {
    super(items)
  }
}