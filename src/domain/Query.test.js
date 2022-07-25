import { render, screen } from '@testing-library/react';
import Query from './Query'
import '@testing-library/jest-dom'
import {simulateBase, simulateUseRecords} from './../tests/SimulatedAirtableClasses'

import queryTestCases from './../tests/cases/query'

import CsvRecordArray from './CsvRecordArray'
import ResultArray from './ResultArray'


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

test('Query match single WHERE query', () => {
  const query = new Query({"id":1658191068337,"type":"WHERE","subQuerys":[],"table":{"id":"tbl08lD2U53OT9bBz","label":"UNFI"},"airtableField":{"id":"fldb2WLxhQCN1zYBl","label":"DISTB_ID"},"rule":"contains","csvField":"DISTB_ID"})
  const csvRecords = new CsvRecordArray([{"id":1657931416763,"originalFields":{"DISTB_ID":"23445"},"currentFields":{"DISTB_ID":"23445"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"33424"},"currentFields":{"DISTB_ID":"33424"}},{"id":1657931416763,"originalFields":{"DISTB_ID":"22344"},"currentFields":{"DISTB_ID":"22344"}}])

  expect(query.type).toBe('WHERE');
  expect(simulateBase.tables.length).toBe(2)
  expect(simulateBase.tables[0].name).toBe('Products')

  const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))


})


queryTestCases.forEach(({name, storeData}) => {
  test(name, () => {
    const query = new Query(storeData.query.query)
    const csvRecords = new CsvRecordArray(storeData.upload.records)
    const results = new ResultArray(query.run(csvRecords, simulateBase, simulateUseRecords))

    results.forEach((result) => {
      expect(result.exactMatches.length).toBe(parseInt(result.csvRecord.currentFields.exactMatches))
      expect(result.partialMatches.length).toBe(parseInt(result.csvRecord.currentFields.partialMatches))
      expect(!!result.match).toBe(JSON.parse(result.csvRecord.currentFields.match.toLowerCase()))
    })
  })
})
