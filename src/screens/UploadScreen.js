import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import CsvUpload from './../UI/CsvUpload'

function UploadScreen({
  base,
  tables,
  actions: {
    AppStateActions,
    UploadActions
  }
}) {

  return (
    <Grid container>
      <Grid item xs={12}>
        <CsvUpload
          uploadData={(data) => {UploadActions.uploadCsvData(data)}}
        />
      </Grid>
    </Grid>
  );
}

const propMap = (store) => ({
  base: store.appState.base,
  tables: store.appState.tables
});


export default connect(propMap, actionProvider)(UploadScreen)

