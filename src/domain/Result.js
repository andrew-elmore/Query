import BasicDomain from './BasicDomain'
import CsvRecord from './CsvRecord';

export default class Result  extends BasicDomain{
  get getMyClass() { return Result; }

  constructor(props = {}){
    super(props)
    this.csvId = props.csvId
    this.table = props.table || null
    this.status = this.setStatus(props)
    this.matches = this.setMatches(props)
  }

  setStatus = (props) => {
    if (props.status === 'notInDatabase') {
      return 'notInDatabase'
    }
    if (props.matches.length === 1) {
      return 'resolved'
    }
    if (props.status) {
      return props.status
    }
    return 'unresolved'
  }

  setMatches = (props) => {
    if (props.status === 'notInDatabase') {
      return []
    } else {
      return props.matches || []
    }
  }

  getActionToken = () => {
    return {
      csvId: this.csvId,
      matches: this.matches,
      table: this.table,
      status: this.status
    }
  };
  getCsvData = (csvData) => {
    if (!csvData) {
      return {}
    }
    const csvRecord = csvData.find(csv => csv.id === this.csvId)
    return csvRecord.currentFields
  }

  getAirtableData = () => {
    return this.matches[0] || {}
  }

  getLinkToken = (field) => {
    return {
      csvId: this.csvId,
      tableId: field.linkedTable.id,
      recordId: this.matches[0][field.name][0]
    }
  }
}