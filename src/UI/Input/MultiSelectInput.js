import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/material/styles';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {

  },

}));

const MultiSelectInput = ({
  value, onChange, label, field, options, onFocus, onBlur, size
}) => {
  const classes = useStyles();
  return (
    <FormControl fullWidth variant="outlined" size={size}>
      <InputLabel id={`${label || field}-select-label`}>
        {label || field}
      </InputLabel>
      <Select
        labelId={`${label || field}-select-label`}
        multiple
        id={`${label || field}-select`}
        value={value}
        onChange={(e) => {onChange({ field, value:e.target.value })}}
        onFocus={() => onFocus(field)}
        onBlur={() => onBlur(field)}
      >
        {options.map((option) => {
          return (
            <MenuItem value={option.value === undefined ? option : option.value}>{option.title === undefined ? option : option.title}</MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
};

MultiSelectInput.propTypes = {
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

MultiSelectInput.defaultProps = {
  value: [],
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

export default MultiSelectInput