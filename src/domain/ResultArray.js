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
    let newItemToken
    const result = this.filter((result) => {
      return result.csvId === item.csvId
    })[0]
    if (result) {
      if (item.status === 'notInDatabase' || item.status === 'resolved') {
        newItemToken = {
          ...result,
          ...item
        }
      } else {
        newItemToken = {
          ...result,
          ...item,
          matches: [...result.matches, ...item.matches]
        }
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

  getDownloadToken = (csvRecords, airtableFields) => {
    const airtableKeys = airtableFields.getInclude()
    return this.map((r) => {
      const itemToken = {}

      const csvRecord = csvRecords.find((record) => {
        return record.id === r.csvId
      })

      Object.keys(csvRecord.originalFields).forEach((key) => {
        itemToken[`CSV-${key}`] = this.cleanDataForExport(csvRecord.originalFields[key])
      })
      airtableKeys.forEach((path) => {
        const key = path.split('.').pop()
        itemToken[key] = this.cleanDataForExport(r.getAirtableValueFromKeyPath(path))
      })
      return itemToken
    })
  }

  getAirtableFields = () => {
    const airtableFields = {}
    this.forEach((result) => {
      result.table.fields.forEach((field) => {
        airtableFields[field.name] = field
      })
    })
    return Object.values(airtableFields)
  }

  addLinkedFields = (meta, payload) => {
    const c = this.clone()
    const item = c.find((result) => {
      return result.csvId === meta.csvId
    })
    item.matches[0][meta.name] = payload.data.fields
    return c
  }

  getLinkTokens = (field) => {
    return this.map(r => r.getLinkToken(field))
  }
}