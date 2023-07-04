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
  actions: {
    AppStateActions,
    ViewActions,
    QueryActions,
  }
}) {
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

  const sortedAndFilteredAirtableFields = [
    ...airtableFields.filter((field) => view[field]),
    ...airtableFields.filter((field) => view[field] === null),
    ...airtableFields.filter((field) => view[field] === undefined),
  ]

  console.log(':~: lockedFields', lockedFields)
  return (
    <Grid container>
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
  query: store.query.query,
});


export default connect(propMap, actionProvider)(ViewScreen)

