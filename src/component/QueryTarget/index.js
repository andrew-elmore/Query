import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

import Input from './../../UI/Input'

const QueryTarget = ({
  dragHandle,
  item
}) => {

  // const classes = useStyles();
  return (
    <Grid container>
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
  );
}

QueryTarget.propTypes = {

};

export default QueryTarget;
