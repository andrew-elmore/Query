import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Input from './../../UI/Input'
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
    backgroundColor: theme.palette.error.dark,
  }
}));

const Resolved = ({
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
      <Grid item xs={6}>
        <FieldsDisplay
          data={csvRecord}
          view={view}
          type='csvField'
          canBeSearchable={false}
        />
      </Grid>
      <Grid item xs={6}>
        <FieldsDisplay
          data={result.matches[0]}
          view={view}
          type='airtableField'
          canBeSearchable={false}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Button
            variant='contained'
            color='primary'
            className={classes.rejectButton}
            onClick={handleNotInDatabase}
          >
            Not in Database
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.rejectButton}
            onClick={handleReject}
          >
            Reject
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}


Resolved.propTypes = {

};

export default Resolved;
