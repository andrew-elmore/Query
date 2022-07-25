import BasicArray from './../../domain/BasicArray'
import Test from './Test'

export default class TestArray extends BasicArray {
  get myClass() { return TestArray; }
  get myItemClass() { return Test; }

  constructor(items = []) {
    super(items)
  }
}