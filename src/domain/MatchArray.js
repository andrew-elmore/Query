import BasicArray from './BasicArray'
import Match from './Match'

export default class MatchArray extends BasicArray {
  get myClass() { return MatchArray; }
  get myItemClass() { return Match; }

  constructor(items = []) {
    super(items)
  }


  runMatches = (results, query) => {
    const resultChunks = {}
    const csvIds = results.map(r => r.csvId)
    csvIds.forEach((csvId) => {
      resultChunks[csvId] = results.filter(r => r.csvId === csvId)
    })

    console.log(':~:', __filename.split('/').pop(), 'method', 'resultChunks', resultChunks)
    const newMatches = this.clone()
    return newMatches
  };

}