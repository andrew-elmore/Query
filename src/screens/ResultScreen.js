import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Result from '../component/Result'
import ViewArray from '../domain/ViewArray'
import Pagination from '@mui/material/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  }
}));

function ResultScreen({
  results,
  view,
  query,
  csvRecords,
  actions: {
    AppStateActions,
    QueryActions,
  }
}) {
  const classes = useStyles();
  const perPage = 10
  const [viewConfig, setViewConfig] = React.useState(new ViewArray())
  const [resolvedPage, setResolvedPage] = React.useState(1)
  const [unresolvedPage, setUnresolvedPage] = React.useState(1)

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

  const handleChangeResult = (result) => {
    QueryActions.updateResult(result)
  }

  return (
    <Grid container className={classes.root}>
      {unresolvedResults.slice(perPage * (unresolvedPage - 1), perPage * unresolvedPage).map((result, index) => {
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
            count={Math.ceil(unresolvedPage.length / perPage)} 
            page={unresolvedPage} 
            onChange={(e, v) => {setUnresolvedPage(v)}}
          />
        </Grid>
      </Grid>
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
    </Grid>
  );
}

const propMap = (store) => ({
  results: store.query.results,
  view: store.view.view,
  query: store.query.query,
  csvRecords: store.upload.records,
});


export default connect(propMap, actionProvider)(ResultScreen)

