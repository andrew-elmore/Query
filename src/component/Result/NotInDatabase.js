import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Input from '../../UI/Input'
import Button from '@mui/material/Button';
import FieldsDisplay from './FieldsDisplay'


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(1),
  },
  rejectButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    }
  }
}));

const NotInDatabase = ({
  result,
  view,
  csvRecords,
  handleChange
}) => {
  const classes = useStyles();

  const csvRecord = csvRecords.find(r => r.id === result.csvId).currentFields

  const handleReject = () => {
    handleChange({
      ...result,
      status: 'unresolved',
    })
  }

  const handleNotInDatabase = () => {
    handleChange({
      ...result,
      matches: [],
      status: 'notInDatabase',
    })
  }

  return (
    <Grid container alignItems="center" className={classes.container}>
      <Grid item xs={12}>
        <FieldsDisplay
          data={csvRecord}
          view={view}
          type='csvField'
          canBeSearchable={false}
        />
      </Grid>
    </Grid>
  );
}


NotInDatabase.propTypes = {

};

export default NotInDatabase;
