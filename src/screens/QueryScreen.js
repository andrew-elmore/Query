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
  actions: {
    QueryActions,
    AppStateActions
  }
}) {

  const runApiQueriesWithDelay = (queryTokenArray, base) => {
    const delay = 1000/4; 
    let index = 0;
  
    const intervalId = setInterval(() => {
      if (index >= queryTokenArray.length) {
        clearInterval(intervalId);
        return;
      }
  
      const queryToken = queryTokenArray[index];
      const pendingRequestCount = queryTokenArray.length;
      QueryActions.runApiQuery({queryToken, base, pendingRequestCount})
      index++;
    }, delay);
  }
   
  const handleRunQuery = () => {
    const queryTokenArray = []
    csvRecords.forEach((csvRecord) => {
      const queryTokens = query.getQueryToken(csvRecord)
      if (queryTokens) {
        queryTokenArray.push(...queryTokens)
      }
    })
    QueryActions.runApiQuery({queryToken: queryTokenArray[0], base})
    runApiQueriesWithDelay(queryTokenArray, base)
    AppStateActions.setTab(2)
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
  records: store.appState.records,
  csvRecords: store.upload.records
});


export default connect(propMap, actionProvider)(QueryScreen)

