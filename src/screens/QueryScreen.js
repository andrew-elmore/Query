import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';

import QueryTarget from './../component/QueryTarget'

import Grid from '@mui/material/Grid';

function QueryScreen({
  query,
  base,
  tables,
  csvRecords,
  actions: {
    AppStateActions,
    QueryActions
  }
}) {
  return (
    <Grid container style={{padding: 10}}>
      <Grid item xs={12}>
        <QueryTarget
          query={query}
          tables={tables}
          onChange={QueryActions.updateQuery}
          base={base}
          csvRecords={csvRecords}
        />
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

