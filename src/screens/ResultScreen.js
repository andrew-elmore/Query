import React from 'react';
import {actionProvider} from './../actions'
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';

function ResultScreen({
  actions: {
    AppStateActions
  }
}) {

  return (
    <Grid container>
      ResultScreen
    </Grid>
  );
}

const propMap = (store) => ({
});


export default connect(propMap, actionProvider)(ResultScreen)

