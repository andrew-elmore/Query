import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import { useRecords } from '@airtable/blocks/ui';

import QueryTarget from './../component/QueryTarget'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function QueryScreen({
  query,
  base,
  tables,
  csvRecords,
  actions: {
    QueryActions
  }
}) {

  const handleRunQuery = () => {
    const results = query.run(csvRecords, base, useRecords)
    QueryActions.run(results)
  }

  return (
    <Grid container style={{padding: 10}}>
      <Grid item xs={12}>
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
  csvRecords: store.upload.records
});


export default connect(propMap, actionProvider)(QueryScreen)

