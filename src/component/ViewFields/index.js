import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Input from './../../UI/Input'
const useStyles = makeStyles((theme) => ({

}));

const ViewField = ({
  dragHandle,
  onChange,
  item
}) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item xs={5}>
        <Input
          items={[]}
          
        />
      </Grid>
      <Grid item xs={5}>
      </Grid>
      <Grid item xs={2}>
        <Grid container justifyContent="flex-end" alignItems="center">
          {dragHandle()}
        </Grid>
      </Grid>
    </Grid>
  );
}

ViewField.propTypes = {

};

export default ViewField;
