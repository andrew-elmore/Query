import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  }
}));

const MultilineInput = ({
  value, onChange, label, field, rows, onFocus, onBlur, size
}) => {
  const classes = useStyles();

  return (
    <TextField 
      className={classes.root}
      multiline
      size={size}
      minRows={rows}
      fullWidth
      label={label ? label: field} 
      variant="outlined" 
      value={value}
      autoComplete='off'
      type="text"
      onChange={(e) => onChange({field, value: e.currentTarget.value})}
      onFocus={() => onFocus(field)}
      onBlur={() => onBlur(field)}
    />
  )
};

MultilineInput.propTypes = {
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

MultilineInput.defaultProps = {
  value: '',
  onChange: () => {},
  label: '',
  field: '',
  options: [],
  error: false, 
  disabled: false, 
  type: '', 
  onFocus: () => {}, 
  onBlur: () => {},
  size: 'medium'
};
export default MultilineInput
