import React from 'react';

import TextField from '@mui/material/TextField';


export default (props) => {
  switch (props.component) {

    default:
      return (
        <TextField 
          fullWidth
          label={props.label ? props.label: props.field} 
          variant="outlined" 
          value={props.inputType}
          error={true}
        />
      )
      break;
  }
}
