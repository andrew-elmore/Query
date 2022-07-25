export default (base, useRecords) => {
  const tableIds = base.tables.map(t => t.id)

  const tablesData = tableIds.map((tableId) => {
    const table = base.getTableById(tableId)
    const records = useRecords(table.selectRecords())
    const fields = table.fields.map((f) => {
      return {
        id: f._id,
        name: f.name
      }
    })

    const recordsData = records.map((record) => {
      const cells = fields.map((f) => {
        return {id: f.id, value: record.getCellValueAsString(f.id)}
      })
      return {id: record.id, cells}
    })
    return {
      id: tableId,
      name: table.name,
      fields: fields,
      records: recordsData
    }
  })

  console.log({
    id: base.id,
    name: base.name,
    tables: tablesData
  })
}