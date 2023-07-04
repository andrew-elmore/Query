import React from 'react';
import {actionProvider} from './../actions'
import { useRecords } from '@airtable/blocks/ui';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import ViewField from '../component/ViewFields';
import Button from '@mui/material/Button';

function ViewScreen({
  tables,
  csvRecords,
  view,
  airtableFields,
  csvFields,
  actions: {
    AppStateActions,
    ViewActions,
    QueryActions,
  }
}) {

  const handleChange = (payload) => {
    ViewActions.update(payload)
  }

  const handleResolve = () => {
    QueryActions.resolveQuery(csvRecords)
    AppStateActions.setTab(3)
  }

  return (
    <Grid container>
      {airtableFields.map((field, index) => (
        <Grid item xs={12}>
          <ViewField
            key={index}
            field={field}
            view={view}
            csvFields={csvFields}
            handleChange={handleChange}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Button
            variant='contained'
            color='primary'
            onClick={handleResolve}
          >
            View
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

const propMap = (store) => ({
  base: store.appState.base,
  tables: store.appState.tables,
  csvRecords: store.upload.records,
  view: store.view.view,
  airtableFields: store.view.airtableFields,
  csvFields: store.view.csvFields,
});


export default connect(propMap, actionProvider)(ViewScreen)

