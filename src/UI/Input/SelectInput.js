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

const SelectInput = ({value, onChange, label, field, options, onFocus, onBlur, size}) => {
  const classes = useStyles();
  const labelId = `${label || field}-select-label`
  const sortedOptions = options.sort()
  return (
    <FormControl fullWidth variant="outlined" size={size}>
      <InputLabel id={labelId}>
        {label || field}
      </InputLabel>
      <Select
        labelId={labelId}
        id={`${label || field}-select`}
        value={value}
        onChange={(e) => {onChange({ field, value:e.target.value })}}
        onFocus={() => onFocus(field)}
        onBlur={() => onBlur(field)}
      >
        {sortedOptions.map((option, idx) => {
          return (
            <MenuItem key={`option-${idx}`} value={option.value === undefined ? option : option.value}>{option.title === undefined ? option : option.title}</MenuItem>
          )
        })}
      </Select>
    </FormControl>
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