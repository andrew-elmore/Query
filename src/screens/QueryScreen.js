import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

import QueryTarget from './../component/QueryTarget'
import QueryTables from '../component/QueryTables';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Icon, IconButton, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import Query from '../domain/Query';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(1),
  },
  pagination: {
    margin: 10
  },
  approveButton: {
    backgroundColor: theme.palette.success.main,
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.success.dark
    }
  },
  rejectButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    }
  }
}));

function QueryScreen({
  query,
  base,
  tables,
  csvRecords,
  queryTables,
  actions: {
    QueryActions,
    AppStateActions
  }
}) {
  const classes = useStyles();
  const runApiQueriesWithDelay = (queryTokenArray) => {
    const delay = 1000/4; 
    let index = 0;
  
    const intervalId = setInterval(() => {
      if (index >= queryTokenArray.length) {
        clearInterval(intervalId);
        return;
      }
  
      const queryToken = queryTokenArray[index];
      const pendingRequestCount = queryTokenArray.length;
      QueryActions.runApiQuery({queryToken, pendingRequestCount})
      index++;
    }, delay);
  }
   
  const handleRunQuery = () => {
    const queryTokenArray = [...csvRecords].map((csvRecord) => {
      return query.getQueryToken(csvRecord, queryTables, base)
    }).flat()

    runApiQueriesWithDelay(queryTokenArray)
    AppStateActions.setTab(2)
  }

  const handleTableChange = (payload) => {
    QueryActions.setQueryTables(payload)
  }

  const handleResetQuery = () => {
    QueryActions.updateQuery(new Query())
  }
  
  const airtableFieldOptions = queryTables.getFields()

  return (
    <Grid container style={{padding: 10}}>
      <Grid item xs={6}>
        <Typography className={classes.rejectIcon}>
          Reset
          <IconButton
            onClick={handleResetQuery}
          >
            <ReplayIcon />
          </IconButton>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Button
            className={classes.approveButton}
            variant='contained'
            color='primary'
            onClick={handleRunQuery}
          >
            Run
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <QueryTables
          onChange={handleTableChange}
          values={queryTables}
          options={tables}
        />
      </Grid>
      <Grid item xs={12}>
        <QueryTarget
          query={query}
          tables={tables}
          airtableFieldOptions={airtableFieldOptions}
          onChange={QueryActions.updateQuery}
          onAdd={QueryActions.addQuery}
          onRemove={QueryActions.removeQuery}
          base={base}
          csvRecords={csvRecords}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.approveButton}
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
  csvRecords: store.upload.records,
  queryTables: store.query.queryTables
});


export default connect(propMap, actionProvider)(QueryScreen)

