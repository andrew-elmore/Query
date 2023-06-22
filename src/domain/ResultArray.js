import BasicArray from './BasicArray'
import Result from './Result'

export default class ResultArray extends BasicArray {
  get myClass() { return ResultArray; }
  get myItemClass() { return Result; }

  constructor(items = []) {
    super(items)
  }

  getAllMatches = () => {
    return this.map((result) => {
      return result.matches
    }).flat()
  }

  populateLinks = (root) => {
    const allMatches = this.getAllMatches()
    console.log(':~:', __filename.split('/').pop(), 'method', 'allMatches', allMatches)

  }
}