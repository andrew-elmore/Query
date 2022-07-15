import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';

function ViewScreen({
  actions: {
    AppStateActions
  }
}) {

  return (
    <Grid container>
      ViewScreen
    </Grid>
  );
}

const propMap = (store) => ({
});


export default connect(propMap, actionProvider)(ViewScreen)

