import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import { useRecords } from '@airtable/blocks/ui';

import QueryTarget from './../component/QueryTarget'
import Table from './../component/QueryTarget/Table'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function QueryScreen({
  query,
  base,
  tables,
  csvRecords,
  records,
  actions: {
    QueryActions,
    AppStateActions
  }
}) {
  const addRecords = (tableId, tableRecords) => {
    if (!records[tableId]) {
      AppStateActions.addRecords({
        [tableId]: tableRecords
      })
    }
  }

  const handleRunQuery = () => {
    const queryTokenArray = [...csvRecords.map((csvRecord) => {
      return query.getQueryToken(csvRecord)
    })]
    console.log(':~:', __filename.split('/').pop(), 'method', 'queryStrings', queryStrings)
    console.log(':~:', __filename.split('/').pop(), 'method', 'base', base)
    QueryActions.runApiQuery({queryToken: queryTokenArray[0], base})

    // QueryActions.runQuery(results)
    // AppStateActions.setTab(2)
  }

  return (
    <Grid container style={{padding: 10}}>
      <Grid item xs={12}>
        {tables.map((table) => {
          return (
            <Table
              table={table}
              addRecords={addRecords}
            />
          )
        })}
        <QueryTarget
          query={query}
          tables={tables}
          onChange={QueryActions.updateQuery}
          onAdd={QueryActions.addQuery}
          onRemove={QueryActions.removeQuery}
          base={base}
          csvRecords={csvRecords}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleRunQuery}
        >
          Run
        </Button>
      </Grid>
    </Grid>
  )
}

const propMap = (store) => ({
  query: store.query.query,
  base: store.appState.base,
  tables: store.appState.tables,
  records: store.appState.records,
  csvRecords: store.upload.records
});


export default connect(propMap, actionProvider)(QueryScreen)

