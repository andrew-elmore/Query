import BasicArray from './BasicArray'
import View from './View'

export default class ViewArray extends BasicArray {
  get myClass() { return ViewArray; }
  get myItemClass() { return View; }

  constructor(items = []) {
    super(items)
  }
}