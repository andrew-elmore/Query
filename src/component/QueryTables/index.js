import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import Input from './../../UI/Input'


const useStyles = makeStyles((theme) => ({
  container: {

  },
}));

const QueryTables = ({
  onChange,
  values,
  options
}) => {
  const classes = useStyles();

  if (values === undefined) {
    return null
  }

  const handleChange = ({field, value}) => {
    const table = options.find(option => option.id === field)
    if (value) {
      onChange([...values, table])
    } else {
      onChange(values.filter(v => v.id !== table.id))
    }
  }

  return (
    <Grid container alignItems="center" className={classes.container}>
      {options.map((option, index) => (
        <Grid item key={index} xs={6}>
          <Input
            type='checkbox'
            size='small'
            value={values.includesById(option.id)}
            field={option.id}
            label={option.name}
            onChange={handleChange}
          />
        </Grid>
      ))}
  
    </Grid>
  );
}

QueryTables.propTypes = {

};

export default QueryTables;
