import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import Input from './../../UI/Input'

const QueryTarget = ({
  dragHandle,
  item
}) => {

  // const classes = useStyles();
  return (
    <Card style={{margin: 5, padding: 5}}>
      <Grid container >
        <Grid item xs={3}>
          {item.label}
        </Grid>
        <Grid item xs={7}>
          <Input
            type='text' 
            onChange={() => {onChange({
              field: 'test', 
              value
            })}}
          />
        </Grid>
        <Grid item xs={2}>
          {dragHandle}
        </Grid>
      </Grid>
    </Card>
  );
}

QueryTarget.propTypes = {

};

export default QueryTarget;
