import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Input from './../../UI/Input'


const useStyles = makeStyles((theme) => ({

}));

const ViewField = ({
  field,
  view,
  csvFields,
  handleChange
}) => {
  const classes = useStyles();
  const isVisible = view[field] === null || view[field]
  return (
    <Grid container alignItems="center">
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
        />
      ) : (
        null
      )}
      </Grid>
      <Grid item xs={2}>
        {isVisible ? (
          <IconButton
            onClick={() => { handleChange({ field: field, value: false }) }}
          >
            <VisibilityIcon/>
          </IconButton>
          ) : (
            <IconButton
              onClick={() => { handleChange({ field: field, value: null }) }}
            >
              <VisibilityOffIcon/>
            </IconButton>
        )}
      </Grid>
    </Grid>
  );
}

ViewField.propTypes = {

};

export default ViewField;
