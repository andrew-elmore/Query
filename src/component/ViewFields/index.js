import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';

import Input from './../../UI/Input'


const useStyles = makeStyles((theme) => ({
  container: {
    height: '56px',
    marginTop: 8,
    marginBottom: 8,
    paddingRight: 8,
    paddingLeft: 8,
  },
}));

const ViewField = ({
  field,
  view,
  csvFields,
  handleChange,
  locked
}) => {
  const classes = useStyles();
  const isVisible = view[field] === null || view[field]

  const icons = () => {
    if (locked) {
      return (
        <IconButton>
          <LockIcon/>
        </IconButton>
      )
    } else if (isVisible) {
      return (
        <IconButton
          onClick={() => { handleChange({ field: field, value: false }) }}
        >
          <VisibilityIcon/>
        </IconButton>
      )
    } else {
      return (
        <IconButton
          onClick={() => { handleChange({ field: field, value: null }) }}
        >
          <VisibilityOffIcon/>
        </IconButton>
      )
    }
  }
  return (
    <Grid container alignItems="center" className={classes.container}>
      <Grid item xs={5}>
        {field}
      </Grid>
      <Grid item xs={5}>
      {isVisible ? (
        <Input
          field={field}
          onChange={handleChange}
          value={view[field]}
          label='CSV Field'
          type="autocomplete"
          options={csvFields}
          disabled={locked}
        />
      ) : (
        null
      )}
      </Grid>
      <Grid item xs={2}>
        <Grid container justifyContent="flex-end" alignItems="center">
          {icons()}
        </Grid>
      </Grid>
    </Grid>
  );
}

ViewField.propTypes = {

};

export default ViewField;
