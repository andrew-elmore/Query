import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Input from '../../UI/Input'


const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

const Unresolved = ({
  result,
  view,

}) => {
  const classes = useStyles();

 

  return (
    <Grid container alignItems="center" className={classes.container}>
      Unresolved
    </Grid>
  );
}

Unresolved.propTypes = {

};

export default Unresolved;
