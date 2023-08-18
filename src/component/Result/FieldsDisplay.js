import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Input from '../../UI/Input'


const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

function reducer(state, action) {
  return {...state, [action.field]: action.value}
}

const FieldsDisplay = ({
  data,
  view,
  type,
  canBeSearchable,
  onBlur
}) => {
  const classes = useStyles();
  
  const initialState = {}

  const [state, dispatch] = React.useReducer(reducer, initialState)

  const handleUpdate = ({field, value}) => {
    dispatch({ field, value })
  }

  React.useEffect(() => {
    view.forEach((viewConfig) => {
      const field = viewConfig[type]
      handleUpdate({ field, value: data[field] })
    })
  }, [data, view])

  const handleBlur = () => {
    onBlur(state)
  }
  return (
    <Grid container alignItems="center" className={classes.container}>
      {view.map((viewConfig) => {
        const field = viewConfig[type]
        return (
          <Grid item xs={12}>
            <Input
              field={field}
              label={field}
              value={state[field]}
              type='text'
              disabled={!(viewConfig.searchable && canBeSearchable)}
              onChange={handleUpdate}
              onBlur={handleBlur}
            />
          </Grid>
        )
      })}
    </Grid>
  );
}

FieldsDisplay.propTypes = {

};

export default FieldsDisplay;
