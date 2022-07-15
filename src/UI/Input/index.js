import React from 'react';

import TextField from '@mui/material/TextField';

import TextInput from './TextInput';
import MultilineInput from './MultilineInput';
import DateInput from './DateInput';
import CheckboxInput from './CheckboxInput';
import Custom from './custom'
import SelectInput from './SelectInput'
import Autocomplete from './Autocomplete';
import MultiSelectInput from './MultiSelectInput'

export default (props) => {
  switch (props.inputType) {
    case 'text':
      return (<TextInput {...props}/>)
      break;
    case 'none':
      return (null)
      break;
    case 'multiline':
      return (<MultilineInput {...props}/>)
      break;
    case 'checkbox':
      return (<CheckboxInput {...props}/>)
      break;
    case 'date':
      return (<DateInput {...props}/>)
      break;
    case 'select':
      return (<SelectInput {...props} />)
      break;
    case 'autocomplete':
      return (<Autocomplete {...props} />)
      break;
    case 'multiSelect':
      return (<MultiSelectInput {...props} />)
      break;
    case 'custom':
      return (<Custom {...props} />)
      break;
    case 'empty':
      return null
      break;

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
