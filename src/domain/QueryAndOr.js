import Query from './Query'
import QueryArray from './QueryArray'
export default class QueryAndOr  extends Query{
  get myClass() { return QueryAndOr; }

  constructor(props = {}){
    super(props)
    this.subQuerys = new QueryArray(props.subQuerys)
  }
}