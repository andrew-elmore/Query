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
  views,
  actions: {
    AppStateActions,
    ViewActions
  }
}) {
  const csvFields = Object.keys(csvRecords[0].currentFields)

  const handleChange = (payload) => {
    ViewActions.updateRow(payload)
  }

  const handleRemove = (payload) => {
    ViewActions.removeRow(payload)
  }

  return (
    <Grid container>
      <Grid item xs={3}>
        <Typography>CSV Field</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>Airtable Field</Typography>
      </Grid>
      {views.map((view) => {
        return (
          <ViewField
            tables={tables}
            view={view}
            csvFields={csvFields}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        )
      })}
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Button
            variant='contained'
            color='primary'
            onClick={() => { ViewActions.addRow() }}
          >
            Add Row
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Button
            variant='contained'
            color='primary'
            onClick={() => { AppStateActions.setTab(3) }}
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
  views: store.view.view
});


export default connect(propMap, actionProvider)(ViewScreen)

