import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Input from '../../UI/Input'


const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

const FieldsDisplay = ({
  data,
  view,
  type,
  canBeSearchable
}) => {
  const classes = useStyles();

 

  return (
    <Grid container alignItems="center" className={classes.container}>
      {view.map((viewConfig) => {
        const field = viewConfig[type]
        return (
          <Grid item xs={12} key={[data.id, type, field].join('-')}>
            <Input
              label={field}
              value={data[field]}
              type='text'
              disabled={!(viewConfig.searchable && canBeSearchable)}
            />
          </Grid>
        )
      })}
    </Grid>
  );
}

FieldsDisplay.propTypes = {

};

export default FieldsDisplay;
