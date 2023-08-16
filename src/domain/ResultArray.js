import BasicArray from './BasicArray'
import Result from './Result'

export default class ResultArray extends BasicArray {
  get myClass() { return ResultArray; }
  get myItemClass() { return Result; }

  constructor(items = []) {
    super(items)
  }

  update = (item) => {
    const c = this.clone()
    for (let i = 0, len = c.length; i < len; i += 1) {
      if (c[i].csvId === item.csvId) {
        c[i] = new Result(item);
      }
    }
    return c;
  };

  addOrUpdate = (item) => {
    const result = this.filter((result) => {
      return result.csvId === item.csvId
    })[0]
    if (result) {
      const newItemToken = {
        ...result,
        matches: [...result.matches, ...item.matches]
      }
      return this.update(newItemToken)
    } else {
      return this.add(item)
    }
  }

  getMatches(csvId) {
    return this.filter((result) => {
      return result.csvId === csvId
    })
  }

  cleanDataForExport = (data) => {
    if (typeof data === 'string') {
      return data.replace(/"/g, '""')
    } else if (typeof data === 'number') {
      return data
    } else if (typeof data === 'boolean') {
      return data
    } else if (typeof data === 'object') {
      if (data instanceof Date) {
        return data.toISOString()
      } else if (data instanceof Array) {
        return data.join(',')
      } else {
        return JSON.stringify(data)
      }
    } else {
      return data || ''
    }

  }

  getDownloadToken = (csv) => {
    const csvHeaders = {}
    const airtableHeaders = {}
    this.forEach((item) => {
      Object.keys(item.getCsvData(csv)).forEach((header) => {
        csvHeaders[header] = true
      })
      Object.keys(item.getAirtableData()).forEach((header) => {
        airtableHeaders[header] = true
      })
    })

    const exportData = this.map((item) => {
      const row = []
      Object.keys(csvHeaders).forEach((header) => {
        const csvData = item.getCsvData(csv)
        row.push(this.cleanDataForExport(csvData[header]))
      })
      row.push('')
      Object.keys(airtableHeaders).forEach((header) => {
        const airtableData = item.getAirtableData()
        row.push(this.cleanDataForExport(airtableData[header]))
      })
      return row
    })
    exportData.unshift([...Object.keys(csvHeaders), '', ...Object.keys(airtableHeaders)])
    return exportData
  }
}