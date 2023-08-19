import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Result from '../component/Result'
import ViewArray from '../domain/ViewArray'
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  approveButton: {
    backgroundColor: theme.palette.success.main,
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.success.dark
    }
  },
}));

function ResultScreen({
  results,
  view,
  query,
  csvRecords,
  base,
  queryTables,
  actions: {
    AppStateActions,
    QueryActions,
    UploadActions,
  }
}) {
  const classes = useStyles();
  const perPage = 10
  const [viewConfig, setViewConfig] = React.useState(new ViewArray())
  const [resolvedPage, setResolvedPage] = React.useState(1)
  const [unresolvedPage, setUnresolvedPage] = React.useState(1)
  const [notInDatabasePage, setNotInDatabasePage] = React.useState(1)

  React.useEffect(() => {
    const newViewConfig = new ViewArray();
    const searchFields = query.getViewFields().map(r => Object.keys(r)[0])
    Object.entries(view).forEach(([airtableField, csvField]) => {
      if (csvField !== false) {
        newViewConfig.push({
          airtableField,
          csvField,
          searchable: searchFields.includes(airtableField),
        })
      }
    })
    setViewConfig(newViewConfig)
  }, [view])
  const unresolvedResults = results.filter(r => r.status === 'unresolved');
  const resolvedResults = results.filter(r => r.status === 'resolved');
  const notInDatabaseResults = results.filter(r => r.status === 'notInDatabase');

  const handleChangeResult = (result) => {
    QueryActions.updateResult(result)
  }

  const handleUpdateCSVRecord = (csvRecord) => {
    UploadActions.update(csvRecord)
  }
   
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
   
  const handleRunQuery = (csvRecord) => {
    console.log(':~:', __filename.split('/').pop(), 'method', 'csvRecord', csvRecord, 'valid: ', !Array.isArray(csvRecord))
    const queryTokenArray = query.getQueryToken(csvRecord, queryTables, base)
    runApiQueriesWithDelay(queryTokenArray)
  }

  const handleSelectResult = (result) => {
    QueryActions.updateResult(result)
  }

  const approveButton = () => (
    <Grid item xs={12}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Button
          variant='contained'
          color='primary'
          className={classes.approveButton}
          onClick={() => {AppStateActions.setTab(4)}}
        >
          Approve
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <Grid container className={classes.root}>
      {approveButton()}
      {unresolvedResults.length > 0 ? (
        <>
          <Grid item xs={12}>Unresolved ({unresolvedResults.length})</Grid>
          {unresolvedResults.slice(perPage * (unresolvedPage - 1), perPage * unresolvedPage).map((result, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Result
                  result={result}
                  view={viewConfig}
                  csvRecords={csvRecords}
                  handleChange={handleChangeResult}
                  handleUpdateCSVRecord={handleUpdateCSVRecord}
                  onRunQuery={handleRunQuery}
                  onSelectResult={handleSelectResult}
                />
              </Grid>
            )
          })}
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center">
              <Pagination 
                count={Math.ceil(unresolvedPage.length / perPage)} 
                page={unresolvedPage} 
                onChange={(e, v) => {setUnresolvedPage(v)}}
              />
            </Grid>
          </Grid>
        </>
      ) : (null)}
      {resolvedResults.length > 0 ? (
        <>
          <Grid item xs={12}>Resolved ({resolvedResults.length})</Grid>
          {resolvedResults.slice(perPage * (resolvedPage - 1), perPage * resolvedPage).map((result, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Result
                  result={result}
                  view={viewConfig}
                  csvRecords={csvRecords}
                  handleChange={handleChangeResult}
                />
              </Grid>
            )
          })}
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center">
              <Pagination 
                count={Math.ceil(resolvedResults.length / perPage)} 
                page={resolvedPage} 
                onChange={(e, v) => {setResolvedPage(v)}}
              />
            </Grid>
          </Grid>
        </>
      ) : (null)}
      {notInDatabaseResults.length > 0 ? (
        <>
          <Grid item xs={12}>Not In Database ({notInDatabaseResults.length})</Grid>
          {notInDatabaseResults.slice(perPage * (notInDatabasePage - 1), perPage * notInDatabasePage).map((result, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Result
                  result={result}
                  view={viewConfig}
                  csvRecords={csvRecords}
                  handleChange={handleChangeResult}
                />
              </Grid>
            )
          })}
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center">
              <Pagination 
                count={Math.ceil(notInDatabaseResults.length / perPage)} 
                page={notInDatabasePage} 
                onChange={(e, v) => {setNotInDatabasePage(v)}}
              />
            </Grid>
          </Grid>
        </>
      ) : (null)}
      {approveButton()}
    </Grid>
  );
}

const propMap = (store) => ({
  results: store.query.results,
  view: store.view.view,
  query: store.query.query,
  csvRecords: store.upload.records,
  base: store.appState.base,
  queryTables: store.query.queryTables
});


export default connect(propMap, actionProvider)(ResultScreen)

