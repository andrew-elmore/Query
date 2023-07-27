import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  }
}));


const SelectInput = ({value, onChange, label, field, options, onFocus, onBlur, size, multiple}) => {
  const classes = useStyles();
  const [textValue, setTextValue] = React.useState(value || '')


  const getOptionLabel = (option) => {
    if (typeof option == 'object') {
      return option.label || option.name || ''
    } else {
      return option
    }
  }
  const getOptionSelected = (option) => {
    if (typeof option == 'object') {
      return option.id === value
    } else {
      return option === value
    }
  }

  const getOptionValue = (option) => {
    if (typeof option == 'object') {
      return option.id
    } else {
      return option
    }
  }

  return (
    <Autocomplete
      className={classes.root}
      multiple={multiple}
      inputValue={textValue}
      onInputChange={(e, value) => {setTextValue(value)}}
      value={value || ''}
      onChange={(e, value) => {onChange({ field, value: value })}}
      options={options}
      disablePortal
      size={size}
      renderInput={(params) => <TextField {...params} label={label || field} />}
      onFocus={onFocus}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      getOptionValue={getOptionValue}
    />
  )
};

SelectInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  field: PropTypes.string,
  options: PropTypes.array,
  error: PropTypes.bool, 
  disabled: PropTypes.bool, 
  type: PropTypes.string, 
  onFocus: PropTypes.func, 
  onBlur: PropTypes.func,
  size: PropTypes.string
};

SelectInput.defaultProps = {
  value: '',
  onChange: () => {},
  label: '',
  field: '',
  options: [],
  error: false, 
  disabled: false, 
  type: '', 
  onFocus: () => {}, 
  onBlur: () => {}
};

export default SelectInput