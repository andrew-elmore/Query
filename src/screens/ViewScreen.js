import React from 'react';
import {actionProvider} from './../actions'
import { useRecords } from '@airtable/blocks/ui';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import ViewField from '../component/ViewFields';
import Button from '@mui/material/Button';

function ViewScreen({
  view,
  airtableFields,
  csvFields,
  query,
  fulfilledRequestCount,
  pendingRequestCount,
  actions: {
    AppStateActions,
    ViewActions,
  }
}) {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [])
  
  const lockedFields = query.getViewFields()
  React.useEffect(() => {
    lockedFields.forEach((viewField) => {
      const payload = {
        field: Object.keys(viewField)[0],
        value: Object.values(viewField)[0],
      }
      ViewActions.update(payload)
    })
  }, [airtableFields])

  const handleChange = (payload) => {
    ViewActions.update(payload)
  }

  const handleResolve = () => {
    AppStateActions.setTab(3)
  }

  console.log(':~:', __filename.split('/').pop(), 'method', 'airtableFields', airtableFields)

  const sortedAndFilteredAirtableFields = [
    ...airtableFields.filter((field) => view[field]),
    ...airtableFields.filter((field) => view[field] === null),
    ...airtableFields.filter((field) => view[field] === undefined),
  ]

  const nextButton = () => (
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Button
            variant='contained'
            color='primary'
            onClick={handleResolve}
            disabled={fulfilledRequestCount !== pendingRequestCount}
          >
            View
          </Button>
        </Grid>
      </Grid>
  )


  return (
    <Grid container>
      {nextButton()}
      {sortedAndFilteredAirtableFields.map((field, index) => (
        <Grid item xs={12}>
          <ViewField
            key={index}
            field={field}
            view={view}
            csvFields={csvFields}
            handleChange={handleChange}
            locked={lockedFields.some(f => f[field])}
          />
        </Grid>
      ))}
      {nextButton()}
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
  query: store.query.query,
  fulfilledRequestCount: store.query.fulfilledRequestCount,
  pendingRequestCount: store.query.pendingRequestCount,
});


export default connect(propMap, actionProvider)(ViewScreen)

