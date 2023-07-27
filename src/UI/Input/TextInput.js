import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  }
}));

const TextInput = ({
  value, onChange, label, field, error, disabled, type, onFocus, onBlur, size
}) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.root}
      size={size}
      type={type}
      fullWidth
      label={label ? label : field} 
      variant="outlined" 
      value={value}
      autoComplete='off'
      error={error}
      disabled={disabled}
      onChange={(e) => onChange({field, value: e.currentTarget.value})}
      onFocus={() => onFocus(field)}
      onBlur={() => onBlur(field)}
    />
  )
};

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  field: PropTypes.string,
  error: PropTypes.bool, 
  disabled: PropTypes.bool, 
  type: PropTypes.string, 
  onFocus: PropTypes.func, 
  onBlur: PropTypes.func,
  size: PropTypes.string
};

TextInput.defaultProps = {
  value: '',
  onChange: () => {},
  label: '',
  field: '',
  error: false, 
  disabled: false, 
  type: '', 
  onFocus: () => {}, 
  onBlur: () => {},
  size: 'medium'
};

export default TextInput