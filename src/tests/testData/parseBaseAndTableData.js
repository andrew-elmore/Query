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
        const cellsData = record.getCellValue(f.id)
        console.log(':~:', __filename.split('/').pop(), 'method', 'cellsData', cellsData)
        return {id: f.id}
      })
      return {id: record.id, cells}
    })
    return {
      id: tableId,
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