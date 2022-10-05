import { render, screen } from '@testing-library/react';
import Query from './Query'
import '@testing-library/jest-dom'
import {simulateBase, simulateUseRecords} from './../tests/SimulatedAirtableClasses'

import queryTestCases from './../tests/cases/query'

import CsvRecordArray from './CsvRecordArray'
import ResultArray from './ResultArray'

const createAndQuery = () => {
  const query = new Query({
    "id":1658191068337,
    "type":"AND",
    "subQuerys":[
      {
        "id":1664843792809,
        "type":"WHERE",
        "subQuerys":[],
        "table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},
        "airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},
        "rule":"contains",
        "csvField":"DISTB_ID"
      },
      {
        "id":1664843885218,
        "type":"WHERE",
        "subQuerys":[],
        "table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},
        "airtableField":{"id":"fldM7Z0xGLSa4qr3S","label":"UPC"},
        "rule":"contains",
        "csvField":"UPC"
      }
    ],
    "table":null,
    "airtableField":null,
    "rule":"contains",
    "csvField":null
  })

  expect(query.type).toBe('AND');
  expect(query.subQuerys.length).toBe(2);
  return query
}
const createOrQuery = () => {
  const query = new Query({
    "id":1658191068337,
    "type":"OR",
    "subQuerys":[
      {
        "id":1664843792809,
        "type":"WHERE",
        "subQuerys":[],
        "table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},
        "airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},
        "rule":"contains",
        "csvField":"DISTB_ID"
      },
      {
        "id":1664843885218,
        "type":"WHERE",
        "subQuerys":[],
        "table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},
        "airtableField":{"id":"fldM7Z0xGLSa4qr3S","label":"UPC"},
        "rule":"contains",
        "csvField":"UPC"
      }
    ],
    "table":null,
    "airtableField":null,
    "rule":"contains",
    "csvField":null
  })

  expect(query.type).toBe('OR');
  expect(query.subQuerys.length).toBe(2);
  return query
}

test('Query can update', () => {
  let query = new Query()
  query = query.updateQuery({
    ids: [query.id],
    field: 'type',
    value: 'AND'
  })
  expect(query.type).toBe('AND');
});

test('Updating query type to and resets WHERE values', () => {
  let query = new Query()
  query = query.updateQuery({
    ids: [query.id],
    field: 'airtableField',
    value: 'FIELD_1'
  })
  expect(query.airtableField).toBe('FIELD_1');
  query = query.updateQuery({
    ids: [query.id],
    field: 'type',
    value: 'AND'
  })

  expect(query.type).toBe('AND');
  expect(query.airtableField).toBe(null);
});

test('Query can add subquery', () => {
  let query = new Query()
  query = query.updateQuery({
    ids: [query.id],
    field: 'type',
    value: 'AND'
  })
  query = query.addQuery({
    ids: [query.id]
  })
  expect(query.type).toBe('AND');
  expect(query.subQuerys.length).toBe(1);
})

test('Query can remove subquery', () => {
  let query = new Query()
  query = query.updateQuery({
    ids: [query.id],
    field: 'type',
    value: 'AND'
  })
  query = query.addQuery({
    ids: [query.id]
  })
  expect(query.type).toBe('AND');
  expect(query.subQuerys.length).toBe(1);
  const subQueryId = query.subQuerys[0].id
  query = query.removeQuery({
    ids: [query.id, subQueryId]
  })
  expect(query.subQuerys.length).toBe(0);
})

test('Query add nested subquery', () => {
  let i = 1
  let query = new Query({id: i})
  const ids = []
  while (i <= 3) {
    ids.push(i)
    query = query.updateQuery({
      ids: [...ids],
      field: 'type',
      value: 'AND'
    })
    query = query.addQuery({
      ids,
      queryProps: {id: i + 1}
    })
    i ++
  }

  expect(query.subQuerys.length).toBe(1);
  expect(query.subQuerys[0].subQuerys.length).toBe(1);
  expect(query.subQuerys[0].subQuerys[0].subQuerys.length).toBe(1);
  expect(query.subQuerys[0].subQuerys[0].subQuerys[0].subQuerys.length).toBe(0);

})
test('Query remove nested subquery', () => {
  let i = 1
  let query = new Query({id: i})
  const ids = []
  while (i <= 3) {
    ids.push(i)
    query = query.updateQuery({
      ids: [...ids],
      field: 'type',
      value: 'AND'
    })
    query = query.addQuery({
      ids,
      queryProps: {id: i + 1}
    })
    i ++
  }
  query = query.removeQuery({
    ids: [1, 2, 3]
  })

  expect(query.subQuerys[0].subQuerys.length).toBe(0);

})

test('Query update nested subquery', () => {
  let i = 1
  let query = new Query({id: i})
  const ids = []
  while (i <= 3) {
    ids.push(i)
    query = query.updateQuery({
      ids: [...ids],
      field: 'type',
      value: 'AND'
    })
    query = query.addQuery({
      ids,
      queryProps: {id: i + 1}
    })
    i ++
  }

  query = query.updateQuery({
    ids: [1, 2],
    field: 'type',
    value: 'WHERE'
  })

  expect(query.subQuerys[0].type).toBe('WHERE');

})

test('Query generates airtable fields list', () => {
  let i = 1
  let query = new Query({id: i})
  const ids = []
  query = query.updateQuery({
    ids: [...ids],
    field: 'type',
    value: 'AND'
  })

  query = query.addQuery({
    ids,
    queryProps: {id: i + 1}
  })
  while (i <= 3) {
    ids.push(i)
    i ++
  }

  query = query.updateQuery({
    ids: [1, 2],
    field: 'type',
    value: 'WHERE'
  })

  expect(query.subQuerys[0].type).toBe('WHERE');

})

test('WHERE, contains, unnested, matches: 0/3, exact: 0/3, partial 0/3', () => {
  const query = new Query({"id":1658191068337,"type":"WHERE","subQuerys":[],"table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},"airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},"rule":"contains","csvField":"DISTB_ID"})
  const csvRecords = new CsvRecordArray([
    {"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},
    {"id":1657931416764,"originalFields":{"DISTB_ID":"00000"},"currentFields":{"DISTB_ID":"00000"}},
    {"id":1657931416765,"originalFields":{"DISTB_ID":"00000"},"currentFields":{"DISTB_ID":"00000"}}
  ])

  expect(query.type).toBe('WHERE');
  expect(simulateBase.tables.length).toBe(2)
  expect(simulateBase.tables[0].name).toBe('Products')

  const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))

  const matches = results.filter((r) => r.match)

  expect(results.length).toBe(3)
  expect(results.filter((r) => r.match).length).toBe(0)
})

test('WHERE, contains, matches: 1/3, exact: 1/3, partial 0/3', () => {
  const query = new Query({"id":1658191068337,"type":"WHERE","subQuerys":[],"table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},"airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},"rule":"contains","csvField":"DISTB_ID"})
  const csvRecords = new CsvRecordArray([
    {"id":1657931416763,"originalFields":{"DISTB_ID":"556349"},"currentFields":{"DISTB_ID":"556349"}},
    {"id":1657931416764,"originalFields":{"DISTB_ID":"00000"},"currentFields":{"DISTB_ID":"00000"}},
    {"id":1657931416765,"originalFields":{"DISTB_ID":"00000"},"currentFields":{"DISTB_ID":"00000"}}
  ])

  expect(query.type).toBe('WHERE');
  expect(simulateBase.tables.length).toBe(2)
  expect(simulateBase.tables[0].name).toBe('Products')

  const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))

  expect(results.length).toBe(3)
  expect(results.filter((r) => r.match).length).toBe(1)
  expect(results.filter((r) => r.exactMatches.length > 0).length).toBe(1)
})

test('WHERE, contains, matches: 1/3, exact: 0/3, partial 1/3', () => {
  const query = new Query({"id":1658191068337,"type":"WHERE","subQuerys":[],"table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},"airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},"rule":"contains","csvField":"DISTB_ID"})
  const csvRecords = new CsvRecordArray([
    {"id":1657931416763,"originalFields":{"DISTB_ID":"5563"},"currentFields":{"DISTB_ID":"5563"}},
    {"id":1657931416764,"originalFields":{"DISTB_ID":"00000"},"currentFields":{"DISTB_ID":"00000"}},
    {"id":1657931416765,"originalFields":{"DISTB_ID":"00000"},"currentFields":{"DISTB_ID":"00000"}}
  ])

  expect(query.type).toBe('WHERE');
  expect(simulateBase.tables.length).toBe(2)
  expect(simulateBase.tables[0].name).toBe('Products')

  const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))

  expect(results.length).toBe(3)
  expect(results.filter((r) => r.match).length).toBe(1)
  expect(results.filter((r) => r.partialMatches.length > 0).length).toBe(1)
})

test('(WHERE && WHERE), contains, matches: 0/3, exact: 0/3, partial 0/3', () => {
  const query = createAndQuery()
  const csvRecords = new CsvRecordArray([
    {"id":1657931416763,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}},
    {"id":1657931416764,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}},
    {"id":1657931416765,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}}
  ])

  expect(query.type).toBe('AND');
  expect(simulateBase.tables.length).toBe(2)
  expect(simulateBase.tables[0].name).toBe('Products')

  const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))

  expect(results.length).toBe(3)
  expect(results.filter((r) => r.match).length).toBe(0)
  expect(results.filter((r) => r.exactMatches.length > 0).length).toBe(0)
  expect(results.filter((r) => r.partialMatches.length > 0).length).toBe(0)
})

test('(WHERE && WHERE), contains, matches: 1/3, exact: 1/3, partial 1/3', () => {
  const query = createAndQuery()
  const csvRecords = new CsvRecordArray([
    {"id":1657931416763,"originalFields":{"DISTB_ID":"556349", "UPC": '446908180895'},"currentFields":{"DISTB_ID":"556349", "UPC": '0000000000'}},
    {"id":1657931416764,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}},
    {"id":1657931416765,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}}
  ])

  expect(query.type).toBe('AND');
  expect(simulateBase.tables.length).toBe(2)
  expect(simulateBase.tables[0].name).toBe('Products')

  const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))

  expect(results.length).toBe(3)
  expect(results.filter((r) => r.match).length).toBe(1)
  expect(results.filter((r) => r.exactMatches.length > 0).length).toBe(1)
  expect(results.filter((r) => r.partialMatches.length > 0).length).toBe(1)
})

test('(WHERE && WHERE), contains, matches: 1/3, exact: 1/3, partial 1/3', () => {
  const query = createAndQuery()
  const csvRecords = new CsvRecordArray([
    {"id":1657931416763,"originalFields":{"DISTB_ID":"55634", "UPC": '44690818089'},"currentFields":{"DISTB_ID":"55634", "UPC": '44690818089'}},
    {"id":1657931416764,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}},
    {"id":1657931416765,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}}
  ])

  expect(query.type).toBe('AND');
  expect(simulateBase.tables.length).toBe(2)
  expect(simulateBase.tables[0].name).toBe('Products')

  const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))

  expect(results.length).toBe(3)
  expect(results.filter((r) => r.match).length).toBe(1)
  expect(results.filter((r) => r.exactMatches.length > 0).length).toBe(0)
  expect(results.filter((r) => r.partialMatches.length > 0).length).toBe(1)
})



test('(WHERE || WHERE), contains, matches: 0/3, exact: 0/3, partial 0/3', () => {
  const query = createOrQuery()
  const csvRecords = new CsvRecordArray([
    {"id":1657931416763,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}},
    {"id":1657931416764,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}},
    {"id":1657931416765,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}}
  ])

  expect(query.type).toBe('OR');
  expect(simulateBase.tables.length).toBe(2)
  expect(simulateBase.tables[0].name).toBe('Products')

  const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))

  expect(results.length).toBe(3)
  expect(results.filter((r) => r.match).length).toBe(0)
  expect(results.filter((r) => r.exactMatches.length > 0).length).toBe(0)
  expect(results.filter((r) => r.partialMatches.length > 0).length).toBe(0)
})

test('(WHERE || WHERE), contains, matches: 1/3, exact: 1/3, partial 1/3', () => {
  const query = createOrQuery()
  const csvRecords = new CsvRecordArray([
    {"id":1657931416763,"originalFields":{"DISTB_ID":"00000", "UPC": '446908180895'},"currentFields":{"DISTB_ID":"00000", "UPC": '446908180895'}},
    {"id":1657931416764,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}},
    {"id":1657931416765,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}}
  ])

  expect(query.type).toBe('OR');
  expect(simulateBase.tables.length).toBe(2)
  expect(simulateBase.tables[0].name).toBe('Products')

  const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))

  expect(results.length).toBe(3)
  expect(results.filter((r) => r.match).length).toBe(1)
  expect(results.filter((r) => r.exactMatches.length > 0).length).toBe(1)
  expect(results.filter((r) => r.partialMatches.length > 0).length).toBe(1)
})

test('(WHERE || WHERE), contains, matches: 1/3, exact: 1/3, partial 1/3', () => {
  const query = createOrQuery()
  const csvRecords = new CsvRecordArray([
    {"id":1657931416763,"originalFields":{"DISTB_ID":"55634", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"55634", "UPC": '0000000000'}},
    {"id":1657931416764,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}},
    {"id":1657931416765,"originalFields":{"DISTB_ID":"00000", "UPC": '0000000000'},"currentFields":{"DISTB_ID":"00000", "UPC": '0000000000'}}
  ])

  expect(query.type).toBe('OR');
  expect(simulateBase.tables.length).toBe(2)
  expect(simulateBase.tables[0].name).toBe('Products')

  const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))

  expect(results.length).toBe(3)
  expect(results.filter((r) => r.match).length).toBe(1)
  expect(results.filter((r) => r.exactMatches.length > 0).length).toBe(0)
  expect(results.filter((r) => r.partialMatches.length > 0).length).toBe(1)
})