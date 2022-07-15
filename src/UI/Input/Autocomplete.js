import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {

  },

}));

const SelectInput = ({value, onChange, label, field, options, onFocus, onBlur, size}) => {
  const classes = useStyles();

  const [textValue, setTextValue] = React.useState(value || '')
  return (
    <Autocomplete
      value={value || ''}
      onChange={(e, value) => {onChange({ field, value: value })}}
      inputValue={textValue}
      onInputChange={(e, value) => {setTextValue(value)}}
      options={options}
      fullWidth
      size={size}
      renderInput={(params) => <TextField {...params} label={label || field} variant="outlined" />}
      onFocus={onFocus}
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