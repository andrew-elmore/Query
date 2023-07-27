import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  }
}));

const DateInput = ({
  value, onChange, label, field, error, disabled, type, onFocus, onBlur, size
}) => {
  const classes = useStyles();

  const [currentValue, setCurrentValue] = React.useState(value ? value : '')
  const [currentError, setCurrentError] = React.useState(error)

  const parseNewDate = () => {
    const parsedDate = Date.parse(currentValue)
    if (isNaN(parsedDate) && currentValue !== '' ) {
      setCurrentError(true)
    } else {
      onChange({field, value: new Date(parsedDate)})
      setCurrentError(false || error)
    }
    onBlur ?? onBlur()
  }

  return (
    <TextField
      className={classes.root}
      size={size}
      fullWidth
      label={label ? label : field} 
      variant="outlined" 
      value={currentValue}
      autoComplete='off'
      type="text"
      error={currentError}
      disabled={disabled}
      onChange={(e) => setCurrentValue(e.currentTarget.value)}
      onFocus={() => onFocus(field)}
      onBlur={() => parseNewDate()}
    />
  )
};

DateInput.propTypes = {
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

DateInput.defaultProps = {
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

export default DateInput;
