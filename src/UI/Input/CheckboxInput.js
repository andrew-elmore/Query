import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => ({
  root: {

  },

}));

const CheckboxInput = ({
  value, onChange, label, field, onFocus, onBlur, size
}) => {
  const classes = useStyles();
  const margin = () => {
    switch (size) {
      case 'small':
        return 1
        break;
    
      default:
        return 45
        break;
    }
  }
  
  return (
    <Grid container alignItems="center" style={{margin: margin(), marginLeft: 4}}>
      <Typography color='primary'>{label ? label : field}
      </Typography>
      <Checkbox 
        checked={value} 
        onChange={(e) => {onChange({field, value: e.target.checked})}} 
        name="checkedA" 
        color="primary"
        onFocus={() => onFocus(field)}
        onBlur={() => onBlur(field)}
        size={size}
      />
    </Grid>
  )
};

CheckboxInput.propTypes = {
  value: PropTypes.bool,
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

CheckboxInput.defaultProps = {
  value: false,
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

export default CheckboxInput;
