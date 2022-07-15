import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';

function ActionScreen({
  actions: {
    AppStateActions
  }
}) {

  return (
    <Grid container>
      ActionScreen
    </Grid>
  );
}

const propMap = (store) => ({
});


export default connect(propMap, actionProvider)(ActionScreen)

