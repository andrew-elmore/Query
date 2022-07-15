import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';

function QueryScreen({
  actions: {
    AppStateActions
  }
}) {

  return (
    <Grid container>
      QueryScreen
    </Grid>
  );
}

const propMap = (store) => ({
});


export default connect(propMap, actionProvider)(QueryScreen)

