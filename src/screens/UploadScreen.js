import React from 'react';
import {actionProvider} from './../actions'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import CsvUpload from './../UI/CsvUpload'
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  approveButton: {
    backgroundColor: theme.palette.success.main,
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.success.dark
    }
  },
}));

function UploadScreen({
  base,
  tables,
  actions: {
    AppStateActions,
    UploadActions
  }
}) {
  const classes = useStyles();


  const continueButton = () => (
    <Grid item xs={12}>
      <Grid container>
        <Button
          variant='contained'
          color='primary'
          className={classes.approveButton}
          onClick={() => {AppStateActions.setTab(1)}}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <CsvUpload
          uploadData={(data) => {UploadActions.uploadCsvData(data)}}
        />
        {continueButton()}
      </Grid>
    </Grid>
  );
}

const propMap = (store) => ({
  base: store.appState.base,
  tables: store.appState.tables
});


export default connect(propMap, actionProvider)(UploadScreen)

