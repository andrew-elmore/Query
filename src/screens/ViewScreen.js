import React from 'react';
import {actionProvider} from './../actions'
import { useRecords } from '@airtable/blocks/ui';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import DragAndDrop from './../UI/DragAndDrop'
import parseBaseAndTableData from './../tests/testData/parseBaseAndTableData'

function ViewScreen({
  base,
  actions: {
    AppStateActions
  }
}) {

  parseBaseAndTableData(base, useRecords)
  return (
    <Grid container>
      {/* {records.map((record) => {
        console.log(':~:', __filename.split('/').pop(), 'method', 'record.getCellValue(TL_ID2)', record.getCellValue('fldb2WLxhQCN1zYBl') )
        return <Grid item xs={12}>
          {record.getCellValue('fldb2WLxhQCN1zYBl')}
        </Grid>
      })} */}

    </Grid>
  );
}

const propMap = (store) => ({
  base: store.appState.base
});


export default connect(propMap, actionProvider)(ViewScreen)

