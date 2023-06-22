import BasicArray from './BasicArray'
import Match from './Match'

export default class MatchArray extends BasicArray {
  get myClass() { return MatchArray; }
  get myItemClass() { return Match; }

  constructor(items = []) {
    super(items)
  }


}