import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';

function UploadScreen({
  base,
  tables,
  actions: {
    AppStateActions
  }
}) {

  console.log(':~:', __filename.split('/').pop(), 'method', 'tables', tables)
  return (
    <Grid container>
      <Grid item xs={12}>
        UploadScreen
      </Grid>
      <Grid item xs={12}>
        {base.name}
      </Grid>
      <Grid item xs={12}>
        {tables.length}
      </Grid>
    </Grid>
  );
}

const propMap = (store) => ({
  base: store.appState.base,
  tables: store.appState.tables
});


export default connect(propMap, actionProvider)(UploadScreen)

